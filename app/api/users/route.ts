import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  await connectDB(); // Ensure DB connection

  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = new URL(req.url).searchParams;

    // Filters
    const filters: any = {};
    if (searchParams.get("email")) filters.email = searchParams.get("email");
    if (searchParams.get("role")) filters.role = searchParams.get("role");
    if (searchParams.get("name")) {
      filters.fullName = { $regex: searchParams.get("name"), $options: "i" }; // Case-insensitive search
    }
    if (searchParams.get("companyName")) {
      filters.companyName = { $regex: searchParams.get("companyName"), $options: "i" }; // For employers
    }

    // Sorting
    const sortQuery: any = {};
    const sortOption = searchParams.get("sort");
    if (sortOption === "latest") sortQuery.createdAt = -1; // Newest first
    if (sortOption === "most-active") sortQuery.lastActive = -1; // Most active first

    // Pagination
    const limit = parseInt(searchParams.get("limit") || "10", 10); // Default: 10 users
    const skip = parseInt(searchParams.get("skip") || "0", 10); // Default: start from 0

    // Fetch users
    const users = await User.find(filters)
      .select("-password") // Exclude password
      .sort(sortQuery)
      .limit(limit)
      .skip(skip);

    return NextResponse.json({ users, count: users.length }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



/*
 Search Filters
By Email: GET /api/users?email=johndoe@example.com
By Role: GET /api/users?role=EMPLOYER
By Name: GET /api/users?name=John
By Company Name (Employers Only): GET /api/users?companyName=TechCorp
✅ Sorting Options
Latest Users: GET /api/users?sort=latest
Most Active Users: GET /api/users?sort=most-active
✅ Pagination
Set Limit (Max users per page) → GET /api/users?limit=5
Set Skip (For pagination) → GET /api/users?skip=10


*/