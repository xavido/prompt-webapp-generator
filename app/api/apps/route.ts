import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("apps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "No s’han pogut carregar les apps."
      },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    apps: data
  });
}