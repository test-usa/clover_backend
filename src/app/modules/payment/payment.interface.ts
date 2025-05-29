import { Types } from "mongoose";
import { PaymentStatus } from "./payment.constant";

export interface TStripePaymentIntent {
    tranctionId?: string;
    senderPaymentTranctionId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    user: Types.ObjectId;
    swapId: string;
  }


  // interfaces/payment.interface.ts

export interface CreatePaymentInput {
  currency: string;
  email: string;
  amount: number;
  swapId: string;
}
