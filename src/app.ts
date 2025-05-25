import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWear/globalErrorHandler";
import notFound from "./app/middleWear/notFound";
import cookieParser from "cookie-parser";
import { UserRoutes } from "./app/modules/user/user.route";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Legalmate!");
});

// Error handler middlewear is positioned after all the routes definition because after the routes are handled then error will occur, not before
app.use(notFound);
app.use(globalErrorHandler);

// app.use("/api",UserRoutes)

export default app;
