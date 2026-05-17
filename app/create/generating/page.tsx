export default function GeneratingPage() {
    return (
      <main className="min-h-screen bg-white px-6 py-12 text-slate-900">
        <section className="mx-auto max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Generació en curs
          </p>
  
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Estem generant la teva webapp educativa
          </h1>
  
          <p className="mt-6 text-lg text-slate-600">
            El sistema està preparant el prompt tècnic, generant el codi,
            revisant possibles limitacions i preparant els recursos per compartir
            l’app.
          </p>
  
          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-medium">1. Analitzant el prompt</p>
              <p className="mt-1 text-sm text-slate-500">
                Detectem quin tipus d’app educativa cal generar.
              </p>
            </div>
  
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-medium">2. Generant el prototip</p>
              <p className="mt-1 text-sm text-slate-500">
                Creem una primera versió funcional de la webapp.
              </p>
            </div>
  
            <div className="rounded-2xl border border-slate-200 p-5">
              <p className="font-medium">3. Preparant publicació i QR</p>
              <p className="mt-1 text-sm text-slate-500">
                Més endavant aquí mostrarem l’estat real del desplegament.
              </p>
            </div>
          </div>
        </section>
      </main>
    );
  }