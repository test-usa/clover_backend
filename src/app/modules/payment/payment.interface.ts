import { Types } from "mongoose";

export interface TStripePaymentIntent {
    id: string;
    amount: number;
    currency: string;
    status: string;
    client_secret: string;
    created: number;
    capture_method: string;
    payment_method_types: string[];
    user: Types.ObjectId;
  }