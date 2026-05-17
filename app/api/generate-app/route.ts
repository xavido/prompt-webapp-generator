import { NextResponse } from "next/server";
import slugify from "slugify";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { buildEducationalPrompt } from "@/lib/prompts";
import { classifyAppRequest } from "@/lib/safety";
import { generateEducationalApp } from "@/lib/generator";
import { generateQrDataUrl } from "@/lib/qr";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const technicalPrompt = buildEducationalPrompt(body);
    const classification = await classifyAppRequest(technicalPrompt);
    const generatedApp = await generateEducationalApp({
      prompt: technicalPrompt,
      classification
    });

    const title =
  generatedApp.title || body.challenge?.slice(0, 80) || "Webapp educativa sense títol";

    const slugBase = slugify(title, {
      lower: true,
      strict: true
    });

    const slug = `${slugBase}-${Date.now()}`;
    const baseUrl = process.env.APP_BASE_URL || "http://localhost:3000";
    const publicAppUrl = `${baseUrl}/apps/${slug}`;
    const qrAppUrl = await generateQrDataUrl(publicAppUrl);

    const { data, error } = await supabaseAdmin
      .from("apps")
      .insert({
        title,
        slug,
        original_prompt: JSON.stringify(body, null, 2),
        educational_prompt: body,
        technical_prompt: technicalPrompt,
        generation_mode: classification.mode,
        template_id: classification.template_id,
        functionality_level: classification.functionality_level,
        public_app_url: publicAppUrl,
        qr_app_url: qrAppUrl,
        simulation_mode: classification.simulation_mode,
        simulated_features: classification.simulated_features,
        requires_auth: classification.requires_auth,
        requires_database: classification.requires_database,
        requires_backend: classification.requires_backend,
        generated_files: generatedApp.files,
        generated_description: generatedApp.description,
        status: "generating"
      })
      .select()
      .single();

    if (error) {
      throw error;
    }
    return NextResponse.json({
      ok: true,
      appId: data.id,
      slug: data.slug,
      generatedApp
    });
  } catch (error) {
    console.error("Error creant app:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "No s’ha pogut crear l’app."
      },
      { status: 500 }
    );
  }
}