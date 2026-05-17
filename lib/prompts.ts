export function buildEducationalPrompt(data: Record<string, string>) {
    return `
  Ets un dissenyador expert d'experiències educatives digitals.
  
  Has de crear una webapp educativa a partir de la informació següent.
  
  REPTE DE L'AULA:
  ${data.challenge}
  
  ALUMNAT:
  ${data.ageRange}
  
  OBJECTIU D'APRENENTATGE:
  ${data.learningGoal}
  
  TIPUS D'EXPERIÈNCIA:
  ${data.experienceType}
  
  INTERACCIÓ DE L'ALUMNAT:
  ${data.interactionType}
  
  CONTINGUTS:
  ${data.contents}
  
  IDEA D'INTERFÍCIE:
  ${data.interfaceIdea}
  
  IDIOMA, TO I ACCESSIBILITAT:
  ${data.languageAccessibility}
  
  PRIVACITAT I LÍMITS ÈTICS:
  ${data.privacyLimits}
  
  REQUISITS GENERALS:
  - La webapp ha de funcionar com a prototip complet.
  - Ha de ser clara per a docents i alumnat.
  - Tots els textos visibles han d'estar en català, excepte si el docent indica explícitament un altre idioma.
  - No ha de recollir dades personals reals.
  - No ha de demanar noms, cognoms, correus ni imatges de menors.
  - No ha de requerir backend real.
  - No ha de requerir base de dades real.
  - Si es demanen usuaris, login, progrés, rànquings o panell docent, s'han de simular de forma segura.
  - Les funcionalitats simulades s'han d'explicar clarament dins de l'app.
  - El resultat ha de ser adequat per a un context educatiu.
  `.trim();
  }