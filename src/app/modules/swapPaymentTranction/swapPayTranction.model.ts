import { model, Schema } from "mongoose";
import { TSwapPaymentTransaction } from "./swapPayTranction.interface";


const swapPayTranctionSchema = new Schema({
    swapId: {
        type: String,
        required: true
    },
    senderUserId: {
        type: String,
        required: true
    },
    senderPaymentTranctionId: {
        type: String,
        required: true
    },
    senderPaymentTranctionStatus: {
        type: Boolean,
        default: true
    },
    receiverUserId: {
        type: String,
        default: ""
    },
    receiverPaymentTranctionId: {
        type: String,
        default: ""
    },
    receiverPaymentTranctionStatus: {
        type: Boolean,
        default: false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    }
})

export const SwapPaymentTransaction = model<TSwapPaymentTransaction>("SwapPaymentTransaction", swapPayTranctionSchema);