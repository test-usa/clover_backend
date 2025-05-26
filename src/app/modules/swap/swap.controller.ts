import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";



const createSwap = catchAsync(async (req, res) => {
  
//   const result = await ProposalService.createAProposalIntoBD(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Swap data Create successfully",
    data: req.body,
  });
});

export const SwapController = {
    createSwap
}