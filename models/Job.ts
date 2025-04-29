import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IJobApplication } from "./JobApplication";

export interface IJob extends Document {
  title: string;
  company: string;
  location: string;
  description: string;
  salary?: number;
  employerId: mongoose.Types.ObjectId | IUser;
  applicants: mongoose.Types.ObjectId[] | IJobApplication[];
  createdAt: Date;
}

const JobSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number },
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "JobApplication" }],
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
export default Job;
