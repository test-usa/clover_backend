import { Schema, model } from 'mongoose';
import { IReview } from './review.interface';



const ReviewSchema = new Schema<IReview>(
  {
    reviewedUser: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);


ReviewSchema.index({ reviewedUser: 1, reviewer: 1 }, { unique: true });

const Review = model<IReview>('Review', ReviewSchema);

export default Review;
