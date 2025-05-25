import { TProposal } from "./proposal.interface";
import { Proposal } from "./proposal.model";




const createAProposalIntoBD = async (proposalData: TProposal) => {
    const result = await Proposal.create(proposalData);
    return result;
};
const getAProposalListIntoBD = async () => {
    const result = await Proposal.find()
    return result;
};

export const ProposalService = {
  createAProposalIntoBD,
  getAProposalListIntoBD
};
