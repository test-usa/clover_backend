import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { PaymentRouters } from "../modules/payment/payment.route";
import { ProposalRoutes } from "../modules/proposal/proposal.route";
import { SwapRoutes } from "../modules/swap/swap.route";
import { ProfileRoutes } from "../modules/profile/profile.route";
import { ReviewRoutes } from "../modules/review/review.route";

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
    path: "/payment",
    route: PaymentRouters,
  },
  { path: "/proposal", route: ProposalRoutes },
  {
    path: "/swap",
    route: SwapRoutes,
  },
  { path: "/profiles", route: ProfileRoutes },
  {
    path: "/reviews",
    route: ReviewRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
