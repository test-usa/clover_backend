import { Request, Response } from 'express';
import { ReviewService } from './review.service';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const reviewer = req.user; // Assuming you attach user info via auth middleware

  const result = await ReviewService.createReview(payload, reviewer);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (_req: Request, res: Response) => {
  const result = await ReviewService.getAllReviews();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews retrieved successfully',
    data: result,
  });
});

const getSingleReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const result = await ReviewService.getSingleReview(reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review retrieved successfully',
    data: result,
  });
});

const updateReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  const updateData = req.body;

  const result = await ReviewService.updateReview(reviewId, updateData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data: result,
  });
});

const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { reviewId } = req.params;

  const result = await ReviewService.deleteReview(reviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: result,
  });
});

export const ReviewController = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
