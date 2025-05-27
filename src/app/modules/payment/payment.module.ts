import mongoose, { Schema, Document, Model, model } from 'mongoose';
import { TStripePaymentIntent } from './payment.interface';
import { PaymentStatus } from './payment.constant';



const StripePaymentIntentSchema: Schema = new Schema<TStripePaymentIntent>({
  tranctionId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  status: {
    type: String,
    enum: Object.values(PaymentStatus),
    required: true,
  },
  client_secret: { type: String, required: true },
  created: { type: Number, required: true },
  capture_method: { type: String, required: true },
  payment_method_types: { type: [String], required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  swapId: { type: String, required: true },
});


export const Payment = model<TStripePaymentIntent>("payment",StripePaymentIntentSchema)
