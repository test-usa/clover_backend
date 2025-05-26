import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProposalRoutes } from "../modules/proposal/proposal.route";
import { SwapRoutes } from "../modules/swap/swap.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/proposal",
    route: ProposalRoutes,
  },
  {
    path: "/swap",
    route: SwapRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
