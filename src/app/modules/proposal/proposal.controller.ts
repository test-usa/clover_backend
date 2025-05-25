import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProposalService } from "./proposal.service";

const createProposal = catchAsync(async (req, res) => {
  const result = await ProposalService.createAProposalIntoBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Proposal data Create successfully",
    data: result,
  });
});

const getAllProposal = catchAsync(async (req, res) => {
  const result = await ProposalService.getAProposalListIntoBD();
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
};
