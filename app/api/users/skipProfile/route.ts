import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  await connectDB(); // Ensure MongoDB connection

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Update user's profileSkipped field
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { profileSkipped: true },
      { new: true, select: "email profileSkipped" }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Profile skipped", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Skip Profile Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
