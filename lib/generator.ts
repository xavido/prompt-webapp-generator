import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

export async function generateEducationalApp(params: {
  prompt: string;
  classification: any;
}) {
  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: `
Genera una webapp educativa estàtica.

Retorna NOMÉS JSON vàlid amb aquesta estructura:

{
  "title": "string",
  "description": "string",
  "files": {
    "index.html": "string",
    "style.css": "string",
    "script.js": "string",
    "README.md": "string",
    "LIMITACIONS.md": "string",
    "CONFIGURACIO_AVANCADA.md": "string",
    "PROMPT_TECNIC.md": "string"
  }
}

Requisits:
- HTML, CSS i JavaScript vanilla.
- Ha de funcionar sense instal·lació.
- No pot utilitzar backend real.
- No pot utilitzar bases de dades reals.
- No pot utilitzar APIs externes.
- No pot demanar dades personals.
- Tots els textos visibles han d'estar en català, excepte si el docent demana explícitament un altre idioma.
- Si es demana login, usuaris, progrés, rànquing o base de dades, s’ha de simular.
- En mode simulació, l’app ha de mostrar un avís clar.
- Si es simula progrés, utilitza localStorage.
- El README ha d’explicar com usar l’app.
- LIMITACIONS.md ha d’explicar què està simulat.
- CONFIGURACIO_AVANCADA.md ha d’explicar com convertir la simulació en funcionalitat real amb Supabase.
- PROMPT_TECNIC.md ha d’incloure el prompt tècnic utilitzat.

Classificació:
${JSON.stringify(params.classification, null, 2)}

Prompt tècnic:
${params.prompt}
`
  });

  const cleaned = response.output_text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

  return JSON.parse(cleaned);
}