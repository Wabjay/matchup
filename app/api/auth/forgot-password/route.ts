import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import User from "@/models/User"; // Your Mongoose model
import { sendPasswordResetEmail } from "@/utils/email";
import { dbConnect } from "@/utils/dbConnects";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "No account found with this email" }, { status: 404 });
    }

    // Generate token & expiration
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000);

    // Save token in DB
    user.resetToken = resetToken;
    user.resetTokenExpires = resetTokenExpires;
    await user.save();

    // Send email
    await sendPasswordResetEmail(email, resetToken);

    return NextResponse.json({ message: "Password reset link sent" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
