import mongoose, { Schema, Document, Model, model } from 'mongoose';
import { TStripePaymentIntent } from './payment.interface';
import { PaymentStatus } from './payment.constant';



const StripePaymentIntentSchema: Schema = new Schema<TStripePaymentIntent>({
  tranctionId: { type: String},
  amount: { type: Number, required: true },
  senderPaymentTranctionId: { type: String,  },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    required: true,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  swapId: { type: String, required: true },
});


export const Payment = model<TStripePaymentIntent>("payment",StripePaymentIntentSchema)
