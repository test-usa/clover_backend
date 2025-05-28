import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWear/globalErrorHandler";
import notFound from "./app/middleWear/notFound";
import cookieParser from "cookie-parser";
import swaggerUi from 'swagger-ui-express';
import { paymentWebhook } from "./app/modules/payment/payment.route";
import { swaggerSpec } from "./app/docs";

const app = express();


// Middlewares
app.use(cors());
app.use('/api/v1/payment/',paymentWebhook)
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1", router);
// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello Legalmate!");
});


app.use(notFound);
app.use(globalErrorHandler);


export default app;
