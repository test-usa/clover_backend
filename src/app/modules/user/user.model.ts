import { Schema, model, Types } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,  // Use false instead of 0 for clarity
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "client"],
      default: "client",
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked", "active"],
      default: "in-progress",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },    // Important to include virtuals in JSON output
    toObject: { virtuals: true },  // Include virtuals when converting to plain object
    timestamps: true,              // Optional: adds createdAt and updatedAt
  }
);

// Virtual for reviews *given* by the user
userSchema.virtual("reviewsGiven", {
  ref: "Review",                // The model to use
  localField: "_id",            // Find reviews where 'reviewer' matches this user's _id
  foreignField: "reviewer",
  justOne: false,
});

// Virtual for reviews *received* by the user
userSchema.virtual("reviewsReceived", {
  ref: "Review",                // The model to use
  localField: "_id",            // Find reviews where 'reviewedUser' matches this user's _id
  foreignField: "reviewedUser",
  justOne: false,
});

export const User = model<TUser>("User", userSchema);
