
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
         return NextResponse.json(
        { message: "Access denied" },
        { status: 403 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password || "");

    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // specific simplified response for the frontend
    return NextResponse.json({
      message: "Login successful",
      token: "admin_token_secure_placeholder", // In production use JWT
      user: {
          email: user.email,
          role: user.role
      }
    });

  } catch (error: any) {
    console.error("Admin Login Error:", error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
}
