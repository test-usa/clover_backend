import httpStatus from "http-status";
import ApiError from "../../errors/ApiError";
import { TProposal } from "./proposal.interface";
import { Proposal } from "./proposal.model";

const createAProposalIntoBD = async (proposalData: TProposal) => {
  const result = await Proposal.create(proposalData);
  return result;
};
const getAProposalListIntoBD = async () => {
  const result = await Proposal.find();
  return result;
};

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

export const ProposalService = {
  createAProposalIntoBD,
  getAProposalListIntoBD,
  proposalStatusChange
};
