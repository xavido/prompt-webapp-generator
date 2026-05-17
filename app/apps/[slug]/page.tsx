import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function PublicAppPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cleanSlug = slug.trim();

  const { data: app, error } = await supabaseAdmin
    .from("apps")
    .select("*")
    .eq("slug", cleanSlug)
    .maybeSingle();

  if (error || !app) {
    return (
      <main className="min-h-screen bg-white p-10 text-slate-900">
        <h1 className="text-2xl font-bold">App no trobada</h1>

        <p className="mt-4">Slug rebut:</p>
        <pre className="mt-2 rounded bg-slate-100 p-4">{slug}</pre>

        <p className="mt-4">Slug netejat:</p>
        <pre className="mt-2 rounded bg-slate-100 p-4">{cleanSlug}</pre>

        <p className="mt-4">Error Supabase:</p>
        <pre className="mt-2 overflow-auto rounded bg-slate-100 p-4">
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }

  if (app.status === "disabled" || app.status === "deleted") {
    return (
      <main className="min-h-screen bg-white p-10 text-slate-900">
        <h1 className="text-2xl font-bold">App no disponible</h1>
        <p className="mt-4">
          Aquesta aplicació ha estat desactivada o retirada.
        </p>
      </main>
    );
  }

  const files = app.generated_files || {};
  const html = String(files["index.html"] || "");
  const css = String(files["style.css"] || "");
  const js = String(files["script.js"] || "");

  if (!html) {
    return (
      <main className="min-h-screen bg-white p-10 text-slate-900">
        <h1 className="text-2xl font-bold">Aquesta app no té HTML generat</h1>
        <p className="mt-4">
          La fila existeix, però no s’ha trobat el fitxer index.html dins de
          generated_files.
        </p>
      </main>
    );
  }

  const previewHtml =
    html.includes("</head>") && html.includes("</body>")
      ? html
          .replace("</head>", `<style>${css}</style></head>`)
          .replace("</body>", `<script>${js}</script></body>`)
      : `
        <!doctype html>
        <html lang="ca">
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;

  return (
    <main className="h-screen w-screen overflow-hidden bg-white">
      <iframe
        title={app.title || "Webapp educativa"}
        className="h-full w-full border-0 bg-white"
        srcDoc={previewHtml}
      />
    </main>
  );
}