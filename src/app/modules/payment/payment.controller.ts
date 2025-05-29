import { Request, Response } from "express"

import status from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentServices } from "./payment.service";
import sendResponse from "../../utils/sendResponse";



// Create Payment Checkout Session
// export const createPayment = catchAsync(
//       async (req: Request & { user?: JwtPayload }, res: Response) => {
//         const userId = req.user?.userId;
    
//         const result = await PaymentServices.createPayments(userId, req.body);
    
//        sendResponse(res, {
//         success: true,
//         statusCode: status.CREATED,
//         message: "Payment created successfully",
//         data: {
//           url: result.url,
//         },
//     });
       
//       }
//     );
export const refundPayment = catchAsync(
      async (req: Request & { user?: JwtPayload }, res: Response) => {
        const userId = req.user?.userId;
        const paymentIntentId = req.params.id;
    
        const result = await PaymentServices.refundPayment(paymentIntentId);
    
       sendResponse(res, {
        success: true,
        statusCode: status.CREATED,
        message: "Payment refund successfully",
        data:result
    
    });
       
      }
    );
    
    // Webhook Handler
    export const handleWebhook = catchAsync(
      async (req: Request, res: Response) => {
        
        const result = await PaymentServices.handleWebhook(req);
        sendResponse(res, {
         success: true,
        statusCode: status.CREATED,
        message: "Payment created successfully",
       data: null,
   });
      }
    );
    

export const paymentController = {
  
      handleWebhook,
      // createPayment,
      refundPayment,
}




