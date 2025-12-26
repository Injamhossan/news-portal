import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import News from "@/models/News";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const deletedUser = await News.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "News deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting news" },
      { status: 500 }
    );
  }
}
