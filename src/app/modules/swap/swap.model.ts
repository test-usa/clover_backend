import { model, Schema } from "mongoose";
import { TSwap } from "./swap.interface";


const swapSchema = new Schema({
    swapId: {
        type: String,
        default: true
    },
    senderUserId: {
        type: String,
        required: true
    },
    senderUserName: {
        type: String,
        required: true
    },
    senderOffer: {
        type: String,
        required: true
    },
    senderWantOffer: {
        type: String,
        required: true
    },
    swapDetails: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endData: {
        type: Date,
        required: true
    },
    associatedDepositeAmount: {
        type: Number,
        required: true
    },
    swapStatus: {
            type: String,
            enum: ["active", "complate"],
            default: "active"
        },
    receiverUserId: {
        type: String,
        required: true
    },
    receiverUserName: {
        type: String,
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})


export const Swap = model<TSwap>("Swap", swapSchema);
