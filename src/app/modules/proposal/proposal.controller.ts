import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProposalService } from "./proposal.service";



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




// This Proposal create only for private route in LogIn User
const createProposal = catchAsync(async (req, res) => {
  // generate a proposal with swap id
 


  // sender payment transaction id - make sure this is a valid id
  //
  // write here  payment transaction system logic this area

  // const PaymentInfo = await PaymentServices.createPayments({user: req.body.senderUserId, body: {
  //   amount: req.body.amount, // amount in cents
  //   currency: "usd", // currency code
  //   email: req.body.email, // sender email
  //   eventId: swapId, // swap id
  // }});

  //
  // Proposal with Swap tranction info save into DB - before sender payment transaction info save into DB

  // const proposalTranctioninfo = await SwapPaymentTransactionServices.SenderProposalPaymentTranctionInfoSaveDB({
  //   swapId: swapId as string, // swap id
  //   senderUserId: req.body.senderUserId, // sender user id
  //   senderPaymentTranctionId: "proposalPaymentTranctionId", // sender payment transaction id - make sure this is a valid id
  // })

  const result = await ProposalService.createAProposalIntoBD(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Proposal data Create successfully",
    data: result
  });
});



// This route also privite route in LogIn User
// This function deletes a proposal and its associated payment transaction from the database.
const deleteProposal = catchAsync(async (req, res) => {
  const result = await ProposalService.deleteAProposalFromBD(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Proposal data deleted successfully",
    data: result,
  });
})



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
  deleteProposal
};
