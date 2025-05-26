import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWear/globalErrorHandler";
import notFound from "./app/middleWear/notFound";
import cookieParser from "cookie-parser";
import { paymentWebhook } from "./app/modules/payment/payment.route";


const app = express();

// Middlewares
app.use(cors());
app.use('/api/v1/payment/',paymentWebhook)
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Legalmate!");
});


app.use(notFound);
app.use(globalErrorHandler);

// app.use("/api",UserRoutes)

export default app;
