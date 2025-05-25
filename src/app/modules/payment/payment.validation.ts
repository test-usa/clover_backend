import { z } from "zod";

const createPaymentSchema = z.object({
  body: z.object({
    user: z.string({ required_error: "User ID is required" }),
    amount: z.number({ required_error: "Amount is required" }).positive(),
    method: z.enum(["card", "paypal", "bank"], {
      required_error: "Payment method is required",
    }),
    status: z.enum(["pending", "completed", "failed"]).optional(),
  }),
});

export const PaymentValidation = {
  createPaymentSchema,
};
