import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Plataforma de prototipatge educatiu amb IA
        </p>

        <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Crea webapps educatives a partir d’un prompt guiat
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Guia docents pas a pas per definir un repte d’aula, generar una
          aplicació educativa funcional, publicar-la, obtenir un QR i accedir al
          repositori del codi.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/create"
            className="rounded-2xl bg-slate-900 px-6 py-3 text-center font-medium text-white"
          >
            Crear una webapp
          </Link>

          <Link
            href="/apps"
            className="rounded-2xl border border-slate-300 px-6 py-3 text-center font-medium"
          >
            Veure la galeria
          </Link>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold">1. Dissenya el prompt</h2>
            <p className="mt-3 text-slate-600">
              El docent construeix el prompt pas a pas mentre aprèn quins
              elements fan que una app educativa estigui ben definida.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold">2. Genera l’app</h2>
            <p className="mt-3 text-slate-600">
              La IA crea una webapp funcional. Si una funcionalitat requereix
              backend, es genera una simulació segura.
            </p>
          </article>

          <article className="rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold">3. Comparteix i revisa</h2>
            <p className="mt-3 text-slate-600">
              El sistema genera QR, repositori de codi, galeria i eines
              d’administració per revisar o desactivar apps.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}