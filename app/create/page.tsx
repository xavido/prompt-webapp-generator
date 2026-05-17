"use client";

import { useState } from "react";

const steps = [
  {
    key: "challenge",
    title: "1. Quin repte tens a l’aula?",
    help: "Descriu una necessitat real del teu grup o una situació que vulguis millorar.",
    why: "Aquest pas dona context a la IA. Com més clar sigui el repte, més adequada serà la webapp generada.",
    placeholder:
      "Exemple: El meu alumnat necessita practicar les taules de multiplicar d’una manera més motivadora."
  },
  {
    key: "ageRange",
    title: "2. Per a qui és aquesta app?",
    help: "Indica l’edat, el curs o les característiques principals de l’alumnat.",
    why: "L’edat i el context ajuden a ajustar el llenguatge, la dificultat, el tipus d’interacció i el disseny visual.",
    placeholder: "Exemple: alumnat de 8 anys, 3r de primària."
  },
  {
    key: "learningGoal",
    title: "3. Quin objectiu d’aprenentatge persegueix?",
    help: "Explica què vols que l’alumnat aprengui, practiqui o consolidi.",
    why: "Una app educativa no només ha de ser atractiva: ha de respondre a un objectiu d’aprenentatge concret.",
    placeholder:
      "Exemple: identificar emocions bàsiques i relacionar-les amb situacions quotidianes."
  },
  {
    key: "experienceType",
    title: "4. Quin tipus d’experiència vols?",
    help: "Pots imaginar un joc, un qüestionari, una ruleta, unes targetes, un simulador o una activitat interactiva.",
    why: "Aquest pas ajuda la IA a decidir quin tipus d’estructura tindrà l’app: joc, repte, activitat, simulació, etc.",
    placeholder: "Exemple: un joc visual de preguntes amb retroacció immediata."
  },
  {
    key: "interactionType",
    title: "5. Com interactuarà l’alumnat?",
    help: "Descriu si farà clic a botons, arrossegarà elements, escriurà respostes, triarà opcions, etc.",
    why: "La interacció defineix com l’alumnat participarà activament dins de l’app.",
    placeholder:
      "Exemple: l’alumnat triarà una resposta entre quatre opcions i rebrà una pista si s’equivoca."
  },
  {
    key: "contents",
    title: "6. Quins continguts ha d’incloure?",
    help: "Afegeix preguntes, conceptes, vocabulari, textos, categories o materials que vulguis incorporar.",
    why: "Els continguts són la matèria primera de l’app. Sense continguts, la IA haurà d’inventar massa coses.",
    placeholder:
      "Exemple: sumes i restes fins al 100, problemes curts i reptes visuals."
  },
  {
    key: "interfaceIdea",
    title: "7. Com t’imagines la interfície?",
    help: "Descriu com t’agradaria que fos visualment: colors, botons, personatges, pantalles, distribució...",
    why: "Imaginar la interfície ajuda a transformar una idea pedagògica en una experiència usable i clara.",
    placeholder:
      "Exemple: una pantalla amb targetes grans, colors suaus, un personatge que dona pistes i botons molt visibles."
  },
  {
    key: "languageAccessibility",
    title: "8. Idioma, to i accessibilitat",
    help: "Defineix l’idioma, el to dels textos i necessitats d’accessibilitat.",
    why: "Aquest pas ajuda a fer que l’app sigui comprensible, inclusiva i adequada al grup.",
    placeholder:
      "Exemple: en català, amb textos curts, botons grans, contrast alt i llenguatge senzill."
  },
  {
    key: "privacyLimits",
    title: "9. Privacitat i límits ètics",
    help: "Indica qualsevol límit important: no recollir dades, no demanar noms, no fer avaluació sensible, etc.",
    why: "Aquest pas és clau per evitar apps que recullin dades personals o generin usos poc adequats en context educatiu.",
    placeholder:
      "Exemple: no ha de demanar noms de l’alumnat ni guardar dades personals."
  }
];

export default function CreatePage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const current = steps[step];
  const isLastStep = step === steps.length - 1;
  const currentValue = data[current.key] || "";
  const canContinue = currentValue.trim().length > 0;

  function updateCurrentStep(value: string) {
    setData({
      ...data,
      [current.key]: value
    });
    setError("");
  }

  function goNext() {
    if (!canContinue) {
      setError("Abans de continuar, escriu una resposta per a aquest pas.");
      return;
    }

    setStep(step + 1);
  }

  async function handleGenerate() {
    if (!canContinue) {
      setError("Abans de generar la webapp, completa aquest últim pas.");
      return;
    }
  
    setIsGenerating(true);
    setError("");
  
    try {
      const response = await fetch("/api/generate-app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (!response.ok || !result.ok || !result.appId) {
        console.error("Error de generació:", result);
        setError(result.error || "No s’ha pogut generar la webapp.");
        setIsGenerating(false);
        return;
      }
  
      window.location.href = `/create/generating?id=${result.appId}`;
    } catch (error) {
      console.error("Error inesperat:", error);
      setError("S’ha produït un error inesperat generant la webapp.");
      setIsGenerating(false);
    }
  }
  function startVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      setError("El teu navegador no permet entrada per veu. Prova-ho amb Chrome o Edge.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = "ca-ES";
    recognition.interimResults = false;
    recognition.continuous = false;
  
    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };
  
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      updateCurrentStep(`${currentValue} ${transcript}`.trim());
    };
  
    recognition.onerror = () => {
      setError("No s'ha pogut transcriure l'àudio.");
    };
  
    recognition.onend = () => {
      setIsListening(false);
    };
  
    recognition.start();
  }

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-slate-500">
          Pas {step + 1} de {steps.length}
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          {current.title}
        </h1>

        <p className="mt-4 text-lg text-slate-600">{current.help}</p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5">
          <h2 className="font-semibold">Per què és important aquest pas?</h2>
          <p className="mt-2 text-slate-600">{current.why}</p>
        </div>

        <textarea
          className="mt-8 min-h-48 w-full rounded-2xl border border-slate-300 p-4 text-base outline-none focus:border-slate-900"
          placeholder={current.placeholder}
          value={currentValue}
          onChange={(event) => updateCurrentStep(event.target.value)}
        />

        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-4">
          <p className="text-sm font-medium text-slate-700">
            Altres formes d’afegir idees
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Més endavant podràs afegir idees amb veu o incorporar una captura
            d’un esbós de la interfície fet en paper.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
          {current.key === "ageRange" && (
              <button
                type="button"
                onClick={startVoiceInput}
                disabled={isListening}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 disabled:opacity-50"
              >
                {isListening ? "Escoltant..." : "Respondre amb veu"}
              </button>
            )}
            <button
              type="button"
              disabled
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-400"
            >
              Afegir amb veu
            </button>

            <button
              type="button"
              disabled
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-400"
            >
              Afegir captura d’un esbós
            </button>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => {
              setError("");
              setStep(step - 1);
            }}
            className="rounded-2xl border border-slate-300 px-5 py-3 font-medium disabled:cursor-not-allowed disabled:opacity-40"
          >
            Enrere
          </button>

          {!isLastStep ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white"
            >
              Següent
            </button>
          ) : (
            <div className="flex flex-col items-end gap-4">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="rounded-2xl bg-slate-900 px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? "Generant la webapp..." : "Generar la webapp"}
              </button>
          
              {isGenerating && (
                <div className="max-w-md rounded-2xl bg-blue-50 p-5 text-blue-900">
                  <p className="font-semibold">Generació en curs</p>
                  <p className="mt-2 text-sm">
                    Estem analitzant el prompt, generant el codi i preparant la vista prèvia.
                    Aquest procés pot trigar uns segons.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 rounded-2xl bg-slate-50 p-5">
          <h2 className="font-semibold">Prompt en construcció</h2>
          <pre className="mt-3 whitespace-pre-wrap text-sm text-slate-600">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      </section>
    </main>
  );
}