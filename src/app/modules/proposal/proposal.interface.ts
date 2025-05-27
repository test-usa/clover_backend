import { Model } from "mongoose";

export interface TProposal {
  swapId: string
  swapTransactionId: string
  proposalStatus: boolean
  senderUserId: string
  senderUserName: string
  senderOffice: string
  senderWantOffice: string
  swapDetails: string
  stratDate: Date
  endData: Date
  associatedDepositeAmount: number
  createAt: Date
}

