import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  role: "STUDENT" | "EMPLOYER";
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  profileImage?: string;

  // 🔹 Profile Completion Tracking
  profileDone: boolean;
  profileSkipped: boolean;

  // 🔹 Student-specific fields
  institution?: string;
  fieldOfStudy?: string;
  skills?: string[];
  availableHours?: number;
  canPostJobs?: boolean;
  resume?: string;
  portfolio?: string;
  preferredJobType?: string;
  preferredLocation?: string;
  expectedSalary?: string;
  workAvailability?: string;

  // 🔹 Employer-specific fields
  companyName?: string;
  companyLogo?: string;
  companyWebsite?: string;
  industry?: string;
  companySize?: string;
  companyLocation?: string;
  jobTitle?: string;
  linkedinProfile?: string;
  jobTypesOffered?: string;
  requiredSkills?: string;
  preferredEducation?: string;
  salaryRange?: string;
  workMode?: string;
  companyDescription?: string;
  companyPerks?: string;
  businessRegNumber?: string;
  socialMediaLinks?: string;
  verificationDocs?: string;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    role: { type: String, enum: ["STUDENT", "EMPLOYER"], default: "STUDENT" },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    phone: { type: String },
    profileImage: { type: String },

    // 🔹 Profile Completion Tracking
    profileDone: { type: Boolean, default: false },
    profileSkipped: { type: Boolean, default: false },

    // 🔹 Student-specific fields
    institution: { type: String },
    fieldOfStudy: { type: String },
    skills: { type: String },
    availableHours: { type: Number },
    canPostJobs: { type: Boolean, default: false },
    resume: { type: String },
    portfolio: { type: String },
    preferredJobType: { type: String },
    preferredLocation: { type: String },
    expectedSalary: { type: String },
    workAvailability: { type: String },

    // 🔹 Employer-specific fields
    companyName: { type: String },
    companyLogo: { type: String },
    companyWebsite: { type: String },
    industry: { type: String },
    companySize: { type: String },
    companyLocation: { type: String },
    jobTitle: { type: String },
    linkedinProfile: { type: String },
    jobTypesOffered: { type: String },
    requiredSkills: { type: String },
    preferredEducation: { type: String },
    salaryRange: { type: String },
    workMode: { type: String },
    companyDescription: { type: String },
    companyPerks: { type: String },
    businessRegNumber: { type: String },
    socialMediaLinks: { type: String },
    verificationDocs: { type: String },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
