

import express from "express";
import { SwapController } from "./swap.controller";

const router = express.Router();

router.post("/", SwapController.createSwap)

export const SwapRoutes = router;