import { Schema, model } from "mongoose";
import { TProposal } from "./proposal.interface";


const proposalSchema = new Schema<TProposal>({
    // proposalId: {
    //     type: String,
    //     required: true
    // },
  senderUserId: {
    type: String,
    required: true
  },
  senderUserName: {
    type: String,
    required: true
  },
  senderOffice: {
    type: String,
    required: true
  },
  senderWantOffice: {
    type: String,
    required: true
  },
  swapDetails: {
    type: String,
    required: true
  },
  stratDate: {
    type: String,
    required: true
  },
  endData: {
    type: String,
    required: true
  },
  AssociatedDepositeAmount: {
    type: Number,
    required: true
  },
})

export const Proposal = model<TProposal>("Proposal", proposalSchema);