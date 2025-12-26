import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await props.params;
    const { id } = resolvedParams;
    
    // Mongoose findById
    const news = await News.findById(id);

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
