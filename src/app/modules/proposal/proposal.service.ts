import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { TProposal } from "./proposal.interface";
import { Proposal } from "./proposal.model";
import { SwapPaymentTransactionServices } from "../swapPaymentTranction/swapPayTranction.services";

const createAProposalIntoBD = async (proposalData: TProposal) => {
  const result = await Proposal.create(proposalData);
  return result;
};


const getAProposalListIntoBD = async () => {
  const result = await Proposal.find();
  return result;
};

const getAProposalIntoBDFindById = async (id: string) => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "Proposal ID is required");
  const result = await Proposal.findById(id);
  if (!result || !result._id)
    throw new ApiError(httpStatus.NOT_FOUND, "NOT FOUND to Fetch proposal");
  return result;
}

const proposalStatusChange = async (id: string) => {
  const result = await Proposal.findById(id);
  if (!result || !result._id)
    throw new ApiError(httpStatus.NOT_FOUND, "NOT FOUND to Fetch proposal");
  if (result.proposalStatus) {
    result.proposalStatus = false;
  } else {
    result.proposalStatus = true;
  }
  result.save();
  return {proposalStatus: result.proposalStatus};
};


const deleteAProposalFromBD = async (id: string) => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "Proposal ID is required");

  // Before delete proposal, you can also delete the associated payment transaction if needed
  const proposal = await getAProposalIntoBDFindById(id);
  if (!proposal || !proposal._id || !proposal.swapTransactionId)
    throw new ApiError(httpStatus.NOT_FOUND, "NOT FOUND to Delete proposal and payment transaction");

  // Fetch the sender payment transaction ID from the proposal
  const senderPaymentTranctionId = await SwapPaymentTransactionServices.getSenderProposalPaymentTranctionInfoFromDB(proposal.swapTransactionId);


  // refund the sender payment transaction if neededt

  // const result = await Proposal.findByIdAndDelete(id);
  // if (!result || !result._id)
  //   throw new ApiError(httpStatus.NOT_FOUND, "NOT FOUND to Delete proposal");
  return senderPaymentTranctionId;
};



export const ProposalService = {
  createAProposalIntoBD,
  getAProposalListIntoBD,
  proposalStatusChange,
  deleteAProposalFromBD,
  getAProposalIntoBDFindById
};
