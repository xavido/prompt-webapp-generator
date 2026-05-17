import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("apps")
    .select("id, title, status, created_at")
    .limit(5);

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error.message
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    apps: data
  });
}