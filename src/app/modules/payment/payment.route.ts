import { Router } from "express";
import express from 'express'
import { paymentController } from "./payment.controller";
const routerRaw = Router();
const router = Router();





router.post('/create-payment', paymentController.createPayment);
router.post('/refund-payment/:id', paymentController.refundPayment);

// Webhook
routerRaw.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

export const PaymentRouters = router;
export const paymentWebhook = routerRaw;


