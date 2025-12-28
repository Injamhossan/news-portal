import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";

export const dynamic = "force-static";

export async function GET() {
  try {
    await connectDB();
    const news = await News.find({}).sort({ createdAt: -1 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const news = await News.create(body);
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating news" },
      { status: 500 }
    );
  }
}
