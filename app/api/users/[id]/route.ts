import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB(); // Ensure DB connection

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const { search, role, email, name } = Object.fromEntries(new URL(req.url).searchParams);

    let query: any = {};
    
    if (id) query._id = id;
    if (email) query.email = email;
    if (role) query.role = role;
    if (name) query.fullName = { $regex: name, $options: "i" }; // Case-insensitive search

    const user = await User.findOne(query).select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const data = await req.json();
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true }).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User updated successfully", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



/*

GET /api/users/65adf123456789abcd123456

GET /api/users?id=65adf123456789abcd123456&email=johndoe@example.com

GET /api/users?role=EMPLOYER

GET /api/users?name=john(case sensitive)


PUT /api/users/65adf123456789abcd123456
Content-Type: application/json
{
  "fullName": "John Updated",
  "phone": "123-456-7890"
}

*/