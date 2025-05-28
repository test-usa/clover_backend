import { Model, Schema, Types } from "mongoose";

export interface TProposal {
  swapId: string
  proposalStatus: boolean
  //proposal created by userA
  senderUserId: Types.ObjectId
  senderPaymentTranctionId: string
  paymentAmount: number
  senderUserName: string
  senderOffice: string
  senderWantOffice: string
  swapDetails: string
  stratDate: Date
  endData: Date
  createAt: Date
}

