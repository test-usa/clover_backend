import { Schema, model, Types } from "mongoose";
import { ILocation, IProfile } from "./profile.interface";



const locationSchema = new Schema<ILocation>({
  city: { type: String, trim: true },
  state: { type: String, trim: true },
  country: { type: String, trim: true },
}, { _id: false });  // no separate _id for location subdoc

const profileSchema = new Schema<IProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    location: {
      type: locationSchema,
      required: false,
    },
    shortBio: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    skills: {
      type: [String],
      default: [],
    },
    wantedSkills: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
    },
    websiteLink: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      enum: ["non-verified", "verified", "premium"],
      default: "non-verified"
    }
  },
  { timestamps: true }
);

export const Profile = model<IProfile>("Profile", profileSchema);
