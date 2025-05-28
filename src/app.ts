// import express, { Request, Response } from "express";
// import cors from "cors";
// import router from "./app/routes";
// import globalErrorHandler from "./app/middleWear/globalErrorHandler";
// import notFound from "./app/middleWear/notFound";
// import cookieParser from "cookie-parser";
// import swaggerUi from 'swagger-ui-express';
// import { paymentWebhook } from "./app/modules/payment/payment.route";
// import { swaggerSpec } from "./app/docs";

// const app = express();

// // Middlewares
// app.use(cors({
//   origin: '*', // allow all origins
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // optional: specify allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // optional: specify allowed headers
// }));
// app.use('/api/v1/payment/',paymentWebhook)
// app.use(express.json());
// app.use(cookieParser());
// app.use("/api/v1", router);
// // Serve Swagger docs
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello Legalmate!");
// });

// app.use(notFound);
// app.use(globalErrorHandler);

// export default app;

import express, { Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middleWear/globalErrorHandler";
import notFound from "./app/middleWear/notFound";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { paymentWebhook } from "./app/modules/payment/payment.route";
import { swaggerSpec } from "./app/docs";

const app = express();
const allowedOrigins = [
  "https://clover-backend-lyh6.onrender.com",
  "http://localhost:3000",
  "http://localhost:5173",
  "*",
];
// CORS + Body Parser
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// app.options('*', cors()); // preflight requests

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/payment/", paymentWebhook);
app.use("/api/v1", router);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello Legalmate!");
});

app.use(notFound);
app.use(globalErrorHandler);

export default app;
