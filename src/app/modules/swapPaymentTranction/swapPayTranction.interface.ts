



// mongoose schema type
export interface TSwapPaymentTransaction {
    senderUserId: string;
    senderPaymentTranctionId: string;
    senderPaymentTranctionStatus: boolean;
    receiverUserId: string;
    receiverPaymentTranctionId: string;
    receiverPaymentTranctionStatus: boolean;
    createAt: Date;
    updateAt: Date;
}


export interface senderDto {
    swapId: string;
    senderUserId: string;
    senderPaymentTranctionId: string;
}