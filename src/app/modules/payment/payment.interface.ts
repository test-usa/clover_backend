import { Types } from "mongoose";
import { PaymentStatus } from "./payment.constant";

export interface TStripePaymentIntent {
    tranctionId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    client_secret: string;
    created: number;
    capture_method: string;
    payment_method_types: string[];
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
