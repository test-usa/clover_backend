import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProposalRoutes } from "../modules/proposal/proposal.route";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
