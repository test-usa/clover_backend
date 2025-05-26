



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
    senderUserId: string;
    senderPaymentTranctionId: string;
}