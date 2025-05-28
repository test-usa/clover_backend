import Stripe from "stripe";
import config from "../../config";
import status from "http-status";
const stripe = new Stripe(config.stripe_secret_key as string, {
  typescript: true,
});

import mongoose, { Types } from "mongoose";
import { Request } from "express";
import app from "../../../app";
import ApiError from "../../errors/ApiError";
import { Payment } from "./payment.module";
import { CreatePaymentInput } from "./payment.interface";
import { TProposal } from "../proposal/proposal.interface";
import { PaymentStatus, serializeMetadata } from "./payment.constant";
import { Proposal } from "../proposal/proposal.model";


// src/modules/payment/payment.services.ts

const createPayments = async (userId: Types.ObjectId , body: CreatePaymentInput, proposalInfo: TProposal) => {
  
  

  const { currency, email, amount, swapId } = body;


  const payment = await Payment.create({
    amount:amount,
    currency,
    status:PaymentStatus.PENDING,
    swapId: swapId,
    user: userId,
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    customer_email: email,
    expand: ["payment_intent"],
    line_items: [
      {
        price_data: {
          currency,
          product_data: { name: "instant payment" ,metadata:{email, swapId,amount}},
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url:config.client_url ,
    cancel_url: config.client_url ,
    payment_intent_data: {
      metadata: {
       
        senderUserId: userId.toString(),
      ...serializeMetadata(proposalInfo),
        swapId: swapId,
         tranctionId: payment._id.toString(), // Store payment ID in metadata
       
      },
    },
  });
  

   if (!session) {
    throw new ApiError(status.BAD_REQUEST, 'Payment session creation failed');
  }

  

  return { url: session.url };
};

const handleWebhook = async (req: Request) => {
  const signature = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      config.stripe_webhook_secret as string
    );
  } catch (error) {
    throw new Error(" signature verification failed.");
  }

  const eventType = event.type;

  if (eventType === "payment_intent.succeeded") {
    const data = event.data.object;

    const metadata = data.metadata;

   



    try{ 
       await  Payment.findByIdAndUpdate(metadata.tranctionId, {status:PaymentStatus.COMPLETED, senderPaymentTranctionId:data.id})
       
       const result = await Proposal.create({...metadata, senderPaymentTranctionId:data.id});
      
    }catch(error) {
     
      throw new ApiError(status.INTERNAL_SERVER_ERROR, "Failed to create proposal");
    }

        
  }

    if( eventType === "payment_intent.payment_failed") {

         const data = event.data.object;

    const metadata = data.metadata;
      try{
         await  Payment.findByIdAndUpdate(metadata.tranctionId, {status:PaymentStatus.CANCELLED} )
      }catch(error){
        throw new ApiError(status.INTERNAL_SERVER_ERROR, "Failed to update payment");
      }
  
};


  

  return { received: true, type: event.type };
};


const refundPayment = async (paymentIntentId: string) => {
 
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    const originalAmount = paymentIntent.amount; 

  
    const refundAmount = Math.round(originalAmount * 0.95);

    // Create refund
    const refund = await stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: refundAmount,
      reason: "requested_by_customer", 
    });
    if (!refund) {
      throw new ApiError(status.BAD_REQUEST, "Refund failed");
    }


     const refunded=  await Payment.findOneAndUpdate({ senderPaymentTranctionId: paymentIntentId },{status:PaymentStatus.REFUNDED},{ new: true });
    
     
    return  refunded ;
  
};




const getUserPayments = async (userId: string) => {
  const payments = await Payment.find({ user: userId }).sort({ created: -1 });

  const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return {
    totalAmount,
    payments,
  };
};



export const PaymentServices = {
  createPayments,
  handleWebhook,
  refundPayment,
  getUserPayments,
};