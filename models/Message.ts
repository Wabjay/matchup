import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId | IUser;
  receiverId: mongoose.Types.ObjectId | IUser;
  content: string;
  timestamp: Date;
}

const MessageSchema: Schema = new Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
