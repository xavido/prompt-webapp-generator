export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function AdminPage() {
    return (
      <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
        <section className="mx-auto max-w-5xl">
          <h1 className="text-4xl font-bold">Panell administrador</h1>
  
          <p className="mt-4 max-w-2xl text-slate-600">
            Aquí es podran revisar, publicar, desactivar o eliminar les webapps
            generades. De moment aquesta pàgina és provisional.
          </p>
  
          <div className="mt-8 rounded-3xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold">Sense dades encara</h2>
            <p className="mt-2 text-slate-600">
              Quan connectem la base de dades, aquí apareixerà el llistat complet
              d’apps generades.
            </p>
          </div>
        </section>
      </main>
    );
  }