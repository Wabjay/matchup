import mongoose, { Schema, Document } from "mongoose";

export enum RoleEnum {
  STUDENT = "STUDENT",
  EMPLOYER = "EMPLOYER",
}

export interface IRole extends Document {
  name: RoleEnum;
}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      enum: Object.values(RoleEnum), // 🔹 Restricts to predefined roles
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.models.Role || mongoose.model<IRole>("Role", RoleSchema);
export default Role;
