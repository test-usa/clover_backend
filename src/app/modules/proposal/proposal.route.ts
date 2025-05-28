

import express from "express";
import { ProposalControllers } from "./proposal.controller";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Proposal
 *   description: Proposal routes
 */


/**
 * @swagger
 * /proposal:
 *   get:
 *     summary: Get all proposals
 *     tags: [Proposal]
 *     responses:
 *       200:
 *         description: List of all proposals
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 66555f4323456abcdef78910
 *                   swapId:
 *                     type: string
 *                     example: SWAP123456
 *                   senderPaymentTranctionId:
 *                     type: string
 *                     example: TXN789123456
 *                   paymentAmount:
 *                     type: number
 *                     example: 1500
 *                   proposalStatus:
 *                     type: boolean
 *                     example: true
 *                   senderUserId:
 *                     type: string
 *                     example: 60c72b2f5f1b2c001f9d1234
 *                   senderUserName:
 *                     type: string
 *                     example: John Doe
 *                   senderOffice:
 *                     type: string
 *                     example: New York
 *                   senderWantOffice:
 *                     type: string
 *                     example: San Francisco
 *                   swapDetails:
 *                     type: string
 *                     example: Swap for Q4 2025
 *                   stratDate:
 *                     type: string
 *                     format: date
 *                     example: 2025-09-01
 *                   endData:
 *                     type: string
 *                     format: date
 *                     example: 2025-09-15
 *                   createAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-05-28T10:00:00Z
 */


/**
 * @swagger
 * /proposal:
 *   post:
 *     summary: Create a new proposal
 *     tags: [Proposal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - swapId
 *               - senderPaymentTranctionId
 *               - paymentAmount
 *               - senderUserId
 *               - senderUserName
 *               - senderOffice
 *               - senderWantOffice
 *               - swapDetails
 *               - stratDate
 *               - endData
 *             properties:
 *               swapId:
 *                 type: string
 *                 example: SWAP123456
 *               senderPaymentTranctionId:
 *                 type: string
 *                 example: TXN789123456
 *               paymentAmount:
 *                 type: number
 *                 example: 1500
 *               proposalStatus:
 *                 type: boolean
 *                 default: true
 *               senderUserId:
 *                 type: string
 *                 format: uuid
 *                 example: 60c72b2f5f1b2c001f9d1234
 *               senderUserName:
 *                 type: string
 *                 example: John Doe
 *               senderOffice:
 *                 type: string
 *                 example: New York
 *               senderWantOffice:
 *                 type: string
 *                 example: San Francisco
 *               swapDetails:
 *                 type: string
 *                 example: Swap for Q4 2025
 *               stratDate:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-01
 *               endData:
 *                 type: string
 *                 format: date
 *                 example: 2025-09-15
 *               createAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-05-28T10:00:00Z
 *     responses:
 *       201:
 *         description: Proposal created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 66555f4323456abcdef78910
 *                 swapId:
 *                   type: string
 *                   example: SWAP123456
 *                 senderUserName:
 *                   type: string
 *                   example: John Doe
 *                 proposalStatus:
 *                   type: boolean
 *                   example: true
 */



/**
 * @swagger
 * /proposal/{id}:
 *   put:
 *     summary: Toggle and return only the proposal status by ID
 *     tags: [Proposal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the proposal to update
 *         schema:
 *           type: string
 *           example: 66555f4323456abcdef78910
 *     responses:
 *       200:
 *         description: Proposal status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 proposalStatus:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Proposal not found
 */


/**
 * @swagger
 * /proposal/{id}:
 *   delete:
 *     summary: Delete a proposal by ID
 *     tags: [Proposal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the proposal to delete
 *         schema:
 *           type: string
 *           example: 66555f4323456abcdef78910
 *     responses:
 *       200:
 *         description: Proposal deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Proposal deleted successfully
 *       404:
 *         description: Proposal not found
 */


router.get("/", ProposalControllers.getAllProposal);
router.post("/", ProposalControllers.createProposal);
router.put("/:id", ProposalControllers.putProposalStatusControl);
router.delete("/:id", ProposalControllers.deleteProposal);

export const ProposalRoutes = router;