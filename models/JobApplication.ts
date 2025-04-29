import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";
import { IJob } from "./Job";

export interface IJobApplication extends Document {
  userId: mongoose.Types.ObjectId | IUser;
  jobId: mongoose.Types.ObjectId | IJob;
  status: string;
  createdAt: Date;
}

const JobApplicationSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
  },
  { timestamps: true }
);

const JobApplication = mongoose.models.JobApplication || mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);
export default JobApplication;
