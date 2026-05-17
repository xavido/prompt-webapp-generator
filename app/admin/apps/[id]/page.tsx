export const dynamic = "force-dynamic";
export const revalidate = 0;

import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function AdminAppDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: app, error } = await supabaseAdmin
    .from("apps")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !app) {
    return (
      <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
        <section className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold">App no trobada</h1>
          <p className="mt-4 text-slate-600">
            No s’ha pogut carregar aquesta aplicació.
          </p>
        </section>
      </main>
    );
  }

  const files = app.generated_files || {};
  const html = String(files["index.html"] || "");
  const css = String(files["style.css"] || "");
  const js = String(files["script.js"] || "");

  const previewHtml = html
    .replace("</head>", `<style>${css}</style></head>`)
    .replace("</body>", `<script>${js}</script></body>`);

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold">{app.title}</h1>

        <p className="mt-4 max-w-3xl text-slate-600">
          {app.generated_description || "Sense descripció."}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold">Estat</p>
            <p className="mt-1 text-slate-600">{app.status}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold">Mode</p>
            <p className="mt-1 text-slate-600">
              {app.generation_mode || "pendent"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="font-semibold">Simulació</p>
            <p className="mt-1 text-slate-600">
              {app.simulation_mode ? "Sí" : "No"}
            </p>
          </div>
        </div>
        {app.public_app_url && (
  <section className="mt-8 rounded-3xl border border-slate-200 p-6">
    <h2 className="text-2xl font-bold">Compartir webapp</h2>

    <p className="mt-3 text-sm text-slate-600">
      Aquesta és la URL pública de l’app generada.
    </p>

    <div className="mt-4 rounded-2xl bg-slate-100 p-4">
      <p className="break-all text-sm">{app.public_app_url}</p>
    </div>

    {app.qr_app_url && (
      <div className="mt-6 flex flex-col items-start gap-4">
        <img
          src={app.qr_app_url}
          alt="QR de la webapp"
          className="w-56 rounded-2xl border border-slate-200"
        />

        <a
          href={app.qr_app_url}
          download={`${app.slug}-qr.png`}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Descarregar QR
        </a>
      </div>
    )}
  </section>
)}

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Vista prèvia de la webapp</h2>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200">
            <iframe
              title="Vista prèvia de la webapp"
              className="h-[700px] w-full bg-white"
              srcDoc={previewHtml}
            />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Fitxers generats</h2>

          <div className="mt-6 space-y-6">
            {Object.entries(files).map(([fileName, content]) => (
              <section key={fileName} className="rounded-2xl border">
                <div className="border-b bg-slate-50 px-4 py-3 font-semibold">
                  {fileName}
                </div>
                <pre className="max-h-96 overflow-auto p-4 text-sm">
                  {String(content)}
                </pre>
              </section>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}