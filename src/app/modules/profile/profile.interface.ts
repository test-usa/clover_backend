import { Types } from "mongoose";

export interface ILocation {
  city?: string;
  state?: string;
  country?: string;
}

export interface IProfile {
  userId: Types.ObjectId;
  fullName: string;
  phone?: string;
  location?: ILocation;
  shortBio?: string;
  skills: string[];
  wantedSkills: string[];
  imageUrl?: string;
  websiteLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
