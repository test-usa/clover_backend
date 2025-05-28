import { Schema, Types, model } from "mongoose";
import { TProposal } from "./proposal.interface";

const proposalSchema = new Schema<TProposal>({
  swapId: {
      type: String,
      required: true
  },
  senderPaymentTranctionId: {
    type: String,
    required: true,
  },
  paymentAmount: {
    type: Number,
    required: true,
  },
  proposalStatus: {
    type: Boolean,
    default: true,
  },
  senderUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  senderUserName: {
    type: String,
    required: true,
  },
  senderOffice: {
    type: String,
    required: true,
  },
  senderWantOffice: {
    type: String,
    required: true,
  },
  swapDetails: {
    type: String,
    required: true,
  },
  stratDate: {
    type: Date,
    required: true,
  },
  endData: {
    type: Date,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export const Proposal = model<TProposal>("Proposal", proposalSchema);
