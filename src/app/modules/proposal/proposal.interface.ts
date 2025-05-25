import { Model } from "mongoose";

export interface TProposal {
  // proposalId: string
  proposalStatus: boolean
  senderUserId: string
  senderUserName: string
  senderOffice: string
  senderWantOffice: string
  swapDetails: string
  stratDate: string
  endData: string
  AssociatedDepositeAmount: number
}

