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


const getSenderProposalPaymentTranctionInfoDBFindById = async (id: string) => {
    if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "Sender Payment Transaction ID is required");
    const result = await SwapPaymentTransaction.findById(id);
    if (!result || !result._id)
        throw new ApiError(httpStatus.NOT_FOUND, "NOT FOUND to Fetch payment transaction info");
    return result;
}

const deleteSenderProposalPaymentTranctionInfoFromDB = async (id: string) => {
    if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "Sender Payment Transaction ID is required");
    const result = await SwapPaymentTransaction.findByIdAndDelete(id);
    if (!result || !result._id)
        throw new ApiError(httpStatus.NOT_FOUND, "NOT FOUND to Delete payment transaction info");
    return result;
}


export const SwapPaymentTransactionServices = {
    SenderProposalPaymentTranctionInfoSaveDB,
    getSenderProposalPaymentTranctionInfoDBFindById,
    deleteSenderProposalPaymentTranctionInfoFromDB
};
// The above code defines a service for handling swap payment transactions in a MongoDB database using Mongoose.