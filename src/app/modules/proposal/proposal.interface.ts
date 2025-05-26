import { Model } from "mongoose";

export interface TProposal {
  // proposalId: string
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

