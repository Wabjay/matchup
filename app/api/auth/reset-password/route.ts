import { NextRequest, NextResponse } from "next/server";
import argon2 from "argon2";
import User from "@/models/User";
import { dbConnect } from "@/utils/dbConnects";

// Password strength regex
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { token, newPassword } = await req.json();

    if (!token || !newPassword) {
      return NextResponse.json({ error: "Token and new password are required" }, { status: 400 });
    }

    // Validate password strength
    if (!passwordRegex.test(newPassword)) {
      return NextResponse.json({
        error: "Password must be at least 8 characters, include uppercase, lowercase, number, and special character."
      }, { status: 400 });
    }

    // Find user with valid reset token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    // Hash and update password
    user.password = await argon2.hash(newPassword);
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful! You can now log in." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
