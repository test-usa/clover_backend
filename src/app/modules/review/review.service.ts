import { JwtPayload } from 'jsonwebtoken';
import { IReview } from './review.interface';
import Review from './review.model';
import { Types } from 'mongoose';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const createReview = async (payload: IReview, reviewer: JwtPayload) => {
  const { reviewedUser, rating, comment } = payload;

  if (reviewedUser.toString() === reviewer.userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You cannot review yourself.');
  }

  const existingReview = await Review.findOne({
    reviewedUser,
    reviewer: reviewer.userId,
  });

  if (existingReview) {
    throw new ApiError(httpStatus.CONFLICT, 'You have already reviewed this user.');
  }

  const review = await Review.create({
    reviewedUser,
    reviewer: reviewer.userId,
    rating,
    comment,
  });

  return review;
};

const getAllReviews = async () => {
  return Review.find()
    .populate('reviewer')
    .populate('reviewedUser');
};

const getSingleReview = async (reviewId: string) => {
  if (!Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid review ID');
  }

  const review = await Review.findById(reviewId)
    .populate('reviewer')
    .populate('reviewedUser');

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return review;
};

const updateReview = async (reviewId: string, updateData: Partial<IReview>) => {
  if (!Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid review ID');
  }

  const review = await Review.findByIdAndUpdate(reviewId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return review;
};

const deleteReview = async (reviewId: string) => {
  if (!Types.ObjectId.isValid(reviewId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid review ID');
  }

  const review = await Review.findByIdAndDelete(reviewId);

  if (!review) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  }

  return review;
};

export const ReviewService = {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
