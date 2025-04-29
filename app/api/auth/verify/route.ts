import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User"; // Mongoose model
import { dbConnect } from "@/utils/dbConnects";

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); // Ensure DB connection

    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find user by email
    let user = await User.findOne({ email: session.user.email });

    // If user does not exist, it means it's a new Google user
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      verified: user.verified,
      profileDone: user.profileDone,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
