

import express from "express";
import { SwapController } from "./swap.controller";

const router = express.Router();


//TODO


/**
 * @swagger
 * tags:
 *   name: Proposal
 *   description: Proposal routes
 */


/**
 * @swagger
 * /swap:
 *   post:
 *     summary: Create a new swap
 *     tags: [Swap]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senderUserId
 *               - senderUserName
 *               - senderOffer
 *               - senderWantOffer
 *               - swapDetails
 *               - startDate
 *               - endData
 *               - associatedDepositeAmount
 *               - receiverUserId
 *               - receiverUserName
 *             properties:
 *               swapId:
 *                 type: string
 *                 example: SWAP0001
 *               senderUserId:
 *                 type: string
 *                 example: 60c72b2f5f1b2c001f9d1234
 *               senderUserName:
 *                 type: string
 *                 example: John Doe
 *               senderOffer:
 *                 type: string
 *                 example: New York Office
 *               senderWantOffer:
 *                 type: string
 *                 example: San Francisco Office
 *               swapDetails:
 *                 type: string
 *                 example: Swapping for Q4 2025 due to family relocation.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-01
 *               endData:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-30
 *               associatedDepositeAmount:
 *                 type: number
 *                 example: 2000
 *               swapStatus:
 *                 type: string
 *                 enum: [active, complate]
 *                 default: active
 *               receiverUserId:
 *                 type: string
 *                 example: 60c72b2f5f1b2c001f9d5678
 *               receiverUserName:
 *                 type: string
 *                 example: Jane Smith
 *               createAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-05-28T10:00:00Z
 *     responses:
 *       201:
 *         description: Swap created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6655abcd23456efgh78901
 *                 swapStatus:
 *                   type: string
 *                   example: active
 */

router.post("/", SwapController.createSwap)

export const SwapRoutes = router;