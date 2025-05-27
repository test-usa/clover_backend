import { Schema, model } from "mongoose";
import { TProposal } from "./proposal.interface";

const proposalSchema = new Schema<TProposal>({
  swapId: {
      type: String,
      required: true
  },
  swapTransactionId: {
    type: String,
    required: true,
  },
  proposalStatus: {
    type: Boolean,
    default: true,
  },
  senderUserId: {
    type: String,
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
  associatedDepositeAmount: {
    type: Number,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

export const Proposal = model<TProposal>("Proposal", proposalSchema);
