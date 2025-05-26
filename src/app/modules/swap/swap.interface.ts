

enum swapStetus {
  active = "active",
  complate = "complate",
}

export interface TSwap {
  swapId: string;
  senderUserId: string;
  senderUserName: string;
  senderOffer: string;
  senderWantOffer: string;
  swapDetails: string;
  startDate: Date;
  endData: Date;
  associatedDepositeAmount: number;
  swapStatus: swapStetus;
  receiverUserId: string;
  receiverUserName: string;
  createAt: Date;
}
