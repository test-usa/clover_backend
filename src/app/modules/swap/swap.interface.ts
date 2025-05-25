

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
  startDate: string;
  endData: string;
  AssociatedDepositeAmount: number;
  swapStatus: swapStetus;
  receiverUserId: string;
  receiverUserName: string;
}
