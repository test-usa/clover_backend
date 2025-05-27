

import express from "express";
import { SwapController } from "./swap.controller";

const router = express.Router();


//TODO

router.post("/", SwapController.createSwap)

export const SwapRoutes = router;