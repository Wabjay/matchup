import { NextResponse } from "next/server";
import argon2 from "argon2";
import { signJwtToken } from "@/lib/auth"; // JWT signing function
import UserModel from "@/models/User";
import { connectDB } from "@/lib/db";
import { z } from "zod"; // For input validation

// Input validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: Request) {
  await connectDB();

  try {
    const { email, password } = await req.json();
    console.log(email,password)

    // Validate input
    const validationResult = loginSchema.safeParse({ email, password });
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.errors[0].message },
        { status: 400 }
      );
    }

    // Find user in MongoDB (Mongoose) and explicitly select password
    const user = await UserModel.findOne({ email }).select("+password");

    // Check password based on hashing algorithm
    let isMatch = false;
    if (user.password.startsWith("$argon2")) {
      const test = await argon2.verify(user.password, password)
      console.log(test)
      isMatch = test;
    } else {
      // Handle plain text passwords (not recommended)
      isMatch = user.password === password;
    }

    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signJwtToken({
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      profileDone: user.profileDone,
      profileSkipped: user.profileSkipped,
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user._id.toString(),
          email: user.email,
          fullName: user.fullName,
          profileDone: user.profileDone,
          profileSkipped: user.profileSkipped,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}