
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";
import mongoose from "mongoose";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    let news;

    if (mongoose.Types.ObjectId.isValid(id)) {
      news = await News.findByIdAndUpdate(
        id,
        { $inc: { views: 1 } },
        { new: true }
      );
    } else {
      news = await News.findOneAndUpdate(
        { slug: id },
        { $inc: { views: 1 } },
        { new: true }
      );
    }

    if (!news) {
      return NextResponse.json(
        { error: "News not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ views: news.views });
  } catch (error) {
    console.error("Error updating view count:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
