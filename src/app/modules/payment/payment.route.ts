import express from "express";
import { PaymentController } from "./payment.controller";
import { validateRequest } from "../../middleWear/validateRequest";
import { PaymentValidation } from "./payment.validation";
import auth from "../../middleWear/auth";
import USER_ROLE from "../../constants/userRole";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.client, USER_ROLE.lawyer),
  validateRequest(PaymentValidation.createPaymentSchema),
  PaymentController.createPayment
);

router.get(
  "/my-payments",
  auth(USER_ROLE.client, USER_ROLE.lawyer),
  PaymentController.getMyPayments
);

export const PaymentRoutes = router;
