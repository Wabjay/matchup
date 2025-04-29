import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET() {
  await connectDB(); // Ensure DB connection

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  await connectDB(); // Ensure DB connection

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { role, ...profileData } = data; // Extract role and profile fields

    // Validate role
    if (!["STUDENT", "EMPLOYER"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Define the update payload based on role
    let updateData: Record<string, any> = {};
    if (role === "STUDENT") {
      updateData = {
        fullName: profileData.fullName,
        phone: profileData.phone,
        profileImage: profileData.profileImage,
        institution: profileData.institution,
        fieldOfStudy: profileData.fieldOfStudy,
        skills: profileData.skills,
        availableHours: profileData.availableHours,
        canPostJobs: profileData.canPostJobs ?? false,
        resume: profileData.resume,
        portfolio: profileData.portfolio,
        preferredJobType: profileData.preferredJobType,
        preferredLocation: profileData.preferredLocation,
        expectedSalary: profileData.expectedSalary,
        workAvailability: profileData.workAvailability,
      };
    } else if (role === "EMPLOYER") {
      updateData = {
        fullName: profileData.fullName,
        phone: profileData.phone,
        profileImage: profileData.profileImage,
        companyName: profileData.companyName,
        companyLogo: profileData.companyLogo,
        companyWebsite: profileData.companyWebsite,
        industry: profileData.industry,
        companySize: profileData.companySize,
        companyLocation: profileData.companyLocation,
        jobTitle: profileData.jobTitle,
        linkedinProfile: profileData.linkedinProfile,
        jobTypesOffered: profileData.jobTypesOffered,
        requiredSkills: profileData.requiredSkills,
        preferredEducation: profileData.preferredEducation,
        salaryRange: profileData.salaryRange,
        workMode: profileData.workMode,
        companyDescription: profileData.companyDescription,
        companyPerks: profileData.companyPerks,
        businessRegNumber: profileData.businessRegNumber,
        socialMediaLinks: profileData.socialMediaLinks,
        verificationDocs: profileData.verificationDocs,
      };
    }

    // Update the user profile
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: updateData },
      { new: true, select: "-password" } // Exclude password from response
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
