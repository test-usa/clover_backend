import { Document, Types } from "mongoose";

/**
 * Interface for the Review document
 */
export interface IReview extends Document {
  reviewedUser: Types.ObjectId;
  reviewer: Types.ObjectId;
  rating: number;
  comment?: string;
  createdAt: Date;
}