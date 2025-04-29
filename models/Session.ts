import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface ISession extends Document {
  sessionToken: string;
  userId: mongoose.Types.ObjectId | IUser;
  expires: Date;
}

const SessionSchema: Schema = new Schema(
  {
    sessionToken: { type: String, required: true, unique: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    expires: { type: Date, required: true },
  },
  { timestamps: true }
);

const Session = mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);
export default Session;
