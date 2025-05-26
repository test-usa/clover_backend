import ApiError from "../../errors/ApiError";
import { senderDto } from "./swapPayTranction.interface";
import { SwapPaymentTransaction } from "./swapPayTranction.model";
import httpStatus from 'http-status';


const SenderProposalPaymentTranctionInfoSaveDB = async (data: senderDto) => {
    const result = await SwapPaymentTransaction.create(data);
    console.log("SenderProposalPaymentTranctionInfoSaveDB result", result);
    if (!result || !result?._id) 
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to save sender payment transaction info");
    return result;
}


export const SwapPaymentTransactionServices = {
    SenderProposalPaymentTranctionInfoSaveDB
};
// The above code defines a service for handling swap payment transactions in a MongoDB database using Mongoose.