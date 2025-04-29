import { NextResponse } from "next/server";
import argon2 from "argon2";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  console.log("📥 Incoming Request...");
  await connectDB(); // Ensure DB connection
  console.log("✅ DB Connected");

  try {
    const body = await req.json();
    console.log("Received Data:", body);
    
    const { email, password, fullName, role } = body;

    if (!email || !password || !fullName || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate role (only allow predefined roles)
    const allowedRoles = ["STUDENT", "EMPLOYER"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role specified" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await argon2.hash(password);
    console.log("🔑 Password Hashed");

    // Create user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      fullName,
      role,
    });
    console.log("✅ User Created:", newUser.email);

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id.toString(),
          email: newUser.email,
          fullName: newUser.fullName,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
