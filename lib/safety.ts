import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

export async function classifyAppRequest(prompt: string) {
  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: `
Analitza aquesta petició de webapp educativa.

Retorna NOMÉS JSON vàlid amb aquesta estructura:

{
  "mode": "template" | "free_generation",
  "template_id": string | null,
  "confidence": number,
  "requires_auth": boolean,
  "requires_database": boolean,
  "requires_backend": boolean,
  "simulation_mode": boolean,
  "simulated_features": string[],
  "ethical_flags": string[],
  "functionality_level": "functional" | "simulated" | "requires_configuration"
}

Plantilles disponibles:
- quiz_interactiu
- flashcards
- ruleta
- escape_room
- classificador
- conte_interactiu
- simulador
- tauler_joc

Regles:
- Si encaixa clarament amb una plantilla, usa "template".
- Si no encaixa clarament, usa "free_generation".
- Si demana usuaris, login, base de dades, guardar progrés, rànquings o panell docent, marca:
  - requires_auth: true si cal login o usuaris
  - requires_database: true si cal persistència
  - requires_backend: true si cal servidor
  - simulation_mode: true
  - functionality_level: "simulated"
- No activis backend real.
- No activis base de dades real.
- No activis autenticació real.

Petició:
${prompt}
`
  });

  return JSON.parse(response.output_text);
}