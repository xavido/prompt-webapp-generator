import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function AppsPage() {
  const { data: apps, error } = await supabaseAdmin
    .from("apps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
        <section className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold">Galeria de webapps</h1>
          <p className="mt-4 text-red-600">
            No s’han pogut carregar les apps.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="text-4xl font-bold">Galeria de webapps</h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              Aquí es mostren les aplicacions educatives generades pels docents.
              De moment veiem totes les apps guardades a Supabase.
            </p>
          </div>

          <Link
            href="/create"
            className="rounded-2xl bg-slate-900 px-5 py-3 text-center font-medium text-white"
          >
            Crear una nova webapp
          </Link>
        </div>

        {apps?.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold">
              Encara no hi ha apps generades
            </h2>
            <p className="mt-2 text-slate-600">
              Quan generis la primera app, apareixerà aquí.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {apps?.map((app) => (
              <article
                key={app.id}
                className="rounded-3xl border border-slate-200 p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {app.functionality_level || "pendent"}
                </p>

                <h2 className="mt-2 text-xl font-semibold">{app.title}</h2>

                {app.generated_description && (
                  <p className="mt-3 line-clamp-4 text-sm text-slate-600">
                    {app.generated_description}
                  </p>
                )}

                <div className="mt-4 space-y-1 text-sm text-slate-500">
                  <p>Estat: {app.status}</p>
                  <p>Mode: {app.generation_mode || "pendent"}</p>
                  <p>Simulació: {app.simulation_mode ? "Sí" : "No"}</p>
                </div>
                {app.qr_app_url && (
                    <div className="mt-5">
                      <p className="mb-2 text-sm font-medium text-slate-700">
                        QR de l’app
                      </p>

                      <img
                        src={app.qr_app_url}
                        alt="QR de la webapp"
                        className="w-32 rounded-xl border border-slate-200"
                      />
                    </div>
                  )}
                <div className="mt-5 flex flex-col gap-2">
                  <Link
                    href={`/admin/apps/${app.id}`}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-center text-sm font-medium text-white"
                  >
                    Veure vista prèvia
                  </Link>

                  <Link
                    href={`/apps/${app.slug}`}
                    className="rounded-xl border border-slate-300 px-4 py-2 text-center text-sm font-medium"
                  >
                    Obrir app pública
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}