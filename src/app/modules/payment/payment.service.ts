import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { Payment } from "./payment.model";
import { TPaymentInput } from "./payment.interface";

const createPayment = async (payload: TPaymentInput) => {
  const payment = await Payment.create(payload);
  if (!payment) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Payment creation failed");
  }
  return payment;
};

const getPaymentsByUser = async (userId: string) => {
  const payments = await Payment.find({ user: userId });
  return payments;
};

export const PaymentService = {
  createPayment,
  getPaymentsByUser,
};
