

import express from "express";
import { ProposalControllers } from "./proposal.controller";

const router = express.Router();

router.get("/", ProposalControllers.getAllProposal);
router.post("/", ProposalControllers.createProposal);

export const ProposalRoutes = router;