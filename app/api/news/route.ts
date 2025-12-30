import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const category = searchParams.get("category");

    let filter: any = {};

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } }
      ];
    }

    if (category) {
      filter.category = category;
    }

    const news = await News.find(filter).sort({ createdAt: -1 });
    return NextResponse.json(news);
  } catch (error: any) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
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
  } catch (error: any) {
    console.error("Error creating news:", error);
    return NextResponse.json(
      { error: error?.message || "Error creating news" },
      { status: 500 }
    );
  }
}
