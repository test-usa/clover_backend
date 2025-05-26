import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProposalService } from "./proposal.service";
import { SwapPaymentTransactionServices } from "../swapPaymentTranction/swapPayTranction.services";

// This Proposal create only for private route in LogIn User
const createProposal = catchAsync(async (req, res) => {
  // sender payment transaction id - make sure this is a valid id
  //
  // write here  payment transaction system logic this area
  //
  // Proposal with Swap tranction info save into DB - before sender payment transaction info save into DB
  const proposalTranctioninfo = await SwapPaymentTransactionServices.SenderProposalPaymentTranctionInfoSaveDB({
    senderUserId: req.body.senderUserId, // sender user id
    senderPaymentTranctionId: "proposalPaymentTranctionId", // sender payment transaction id - make sure this is a valid id
  })

  const result = await ProposalService.createAProposalIntoBD({...req.body, swapTransactionId: proposalTranctioninfo._id});
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Proposal data Create successfully",
    data: result,
  });
});





//Global route
const getAllProposal = catchAsync(async (req, res) => {
  const result = await ProposalService.getAProposalListIntoBD();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Proposal data retrieved successfully",
    data: result,
  });
});




// This Proposal Status Controler only for private (putProposalStatusControl) route in LogIn User
const putProposalStatusControl = catchAsync(async (req, res) => {
  // console.log("proposal find by id", req.params)
  const result = await ProposalService.proposalStatusChange(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Proposal data retrieved successfully",
    data: result,
  });
});




export const ProposalControllers = {
  createProposal,
  getAllProposal,
  putProposalStatusControl,
};
