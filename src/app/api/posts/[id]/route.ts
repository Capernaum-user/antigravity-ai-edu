import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await query("DELETE FROM posts WHERE id = ?", [id]);
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
