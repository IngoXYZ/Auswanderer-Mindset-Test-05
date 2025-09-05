
export interface Question {
  id: string;
  category: string;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

export const categories = {
  veraenderungsbereitschaft: 'Veränderungsbereitschaft',
  sicherheitsbeduerfnis: 'Sicherheitsbedürfnis',
  anpassungsfaehigkeit: 'Anpassungsfähigkeit',
  risikobereitschaft: 'Risikobereitschaft',
  growth_vs_komfort: 'Growth vs. Komfort Mindset',
  konformitaet_vs_rebell: 'Konformität vs. Rebell',
  finanzielle_situation: 'Finanzielle Situation',
  wertekompass: 'Wertekompass'
};

export const questions: Question[] = [
  // Veränderungsbereitschaft (2 Fragen)
  {
    id: 'v1',
    category: 'veraenderungsbereitschaft',
    text: 'Wie reagierst du normalerweise auf große Veränderungen in deinem Leben?',
    options: [
      { text: 'Ich vermeide sie und halte an Bewährtem fest', score: 1 },
      { text: 'Ich bin meist skeptisch und brauche viel Zeit', score: 2 },
      { text: 'Ich bin neutral, manchmal offen, manchmal nicht', score: 3 },
      { text: 'Ich bin meist offen und neugierig', score: 4 },
      { text: 'Ich freue mich darauf und suche aktiv nach Veränderungen', score: 5 }
    ]
  },
  {
    id: 'v2',
    category: 'veraenderungsbereitschaft',
    text: 'Stell dir vor, du müsstest spontan dein komplettes Lebensumfeld wechseln. Wie würdest du reagieren?',
    options: [
      { text: 'Das wäre ein Albtraum, ich würde alles tun, um es zu vermeiden', score: 1 },
      { text: 'Sehr stressig, ich bräuchte sehr lange, um mich anzupassen', score: 2 },
      { text: 'Schwierig, aber machbar mit genug Vorbereitung', score: 3 },
      { text: 'Herausfordernd, aber auch aufregend', score: 4 },
      { text: 'Ein spannendes Abenteuer, auf das ich mich freue', score: 5 }
    ]
  },

  // Sicherheitsbedürfnis (2 Fragen)
  {
    id: 's1',
    category: 'sicherheitsbeduerfnis',
    text: 'Wie wichtig ist dir ein vorhersehbarer Alltag mit festen Routinen?',
    options: [
      { text: 'Extrem wichtig, ohne Routinen fühle ich mich völlig verloren', score: 1 },
      { text: 'Sehr wichtig, ich brauche Struktur und Planbarkeit', score: 2 },
      { text: 'Wichtig, aber ich kann auch flexibel sein', score: 3 },
      { text: 'Weniger wichtig, ich mag auch spontane Abwechslung', score: 4 },
      { text: 'Unwichtig, ich liebe Unvorhersehbarkeit und Spontaneität', score: 5 }
    ]
  },
  {
    id: 's2',
    category: 'sicherheitsbeduerfnis',
    text: 'Wie gehst du mit unbekannten Situationen um, in denen du die "Spielregeln" nicht kennst?',
    options: [
      { text: 'Ich vermeide sie komplett oder bin sehr gestresst', score: 1 },
      { text: 'Ich bin sehr unsicher und brauche viel Unterstützung', score: 2 },
      { text: 'Ich informiere mich gründlich vorher', score: 3 },
      { text: 'Ich gehe optimistisch ran und lerne unterwegs', score: 4 },
      { text: 'Ich stürze mich rein und finde es spannend', score: 5 }
    ]
  },

  // Anpassungsfähigkeit (2 Fragen)
  {
    id: 'a1',
    category: 'anpassungsfaehigkeit',
    text: 'Wie schnell findest du dich in neuen sozialen Gruppen zurecht?',
    options: [
      { text: 'Sehr schwer, ich brauche sehr lange oder schaffe es gar nicht', score: 1 },
      { text: 'Schwer, es dauert Monate bis ich mich wohlfühle', score: 2 },
      { text: 'Mittel, nach einigen Wochen finde ich meinen Platz', score: 3 },
      { text: 'Relativ schnell, innerhalb weniger Wochen', score: 4 },
      { text: 'Sehr schnell, ich kenne nach Tagen schon neue Leute', score: 5 }
    ]
  },
  {
    id: 'a2',
    category: 'anpassungsfaehigkeit',
    text: 'Wie gehst du damit um, wenn in einem neuen Land andere Regeln und Gepflogenheiten gelten?',
    options: [
      { text: 'Das würde mich stark überfordern und frustrieren', score: 1 },
      { text: 'Ich würde stark an meinen gewohnten Wegen festhalten', score: 2 },
      { text: 'Ich würde mich langsam anpassen, aber es wäre schwer', score: 3 },
      { text: 'Ich würde es als Lernprozess sehen und mich anpassen', score: 4 },
      { text: 'Ich würde es als spannende kulturelle Bereicherung erleben', score: 5 }
    ]
  },

  // Risikobereitschaft (2 Fragen)
  {
    id: 'r1',
    category: 'risikobereitschaft',
    text: 'Stell dir vor, du hast die Chance auf deinen Traumjob im Ausland, aber es bedeutet, deine aktuelle Sicherheit aufzugeben. Wie entscheidest du?',
    options: [
      { text: 'Niemals, Sicherheit geht über alles', score: 1 },
      { text: 'Nur wenn ich 100%ige Garantien habe', score: 2 },
      { text: 'Nur nach sehr gründlicher Absicherung', score: 3 },
      { text: 'Ich würde das Risiko eingehen, wenn die Chance gut ist', score: 4 },
      { text: 'Sofort, solche Chancen muss man ergreifen', score: 5 }
    ]
  },
  {
    id: 'r2',
    category: 'risikobereitschaft',
    text: 'Wie stehst du zu finanziellen Risiken beim Auswandern (z.B. Job kündigen ohne konkrete Zusage)?',
    options: [
      { text: 'Absolut unmöglich, das würde ich nie machen', score: 1 },
      { text: 'Nur mit mehreren Jahren Erspartem als Sicherheit', score: 2 },
      { text: 'Mit ausreichend finanzieller Absicherung für 6-12 Monate', score: 3 },
      { text: 'Mit ein paar Monaten Puffer würde ich es wagen', score: 4 },
      { text: 'Manchmal muss man Risiken eingehen, auch ohne große Rücklagen', score: 5 }
    ]
  },

  // Growth vs. Komfort Mindset (2 Fragen)
  {
    id: 'g1',
    category: 'growth_vs_komfort',
    text: 'Welche Aussage beschreibt deine Lebenseinstellung am besten?',
    options: [
      { text: 'Ich möchte mein Leben so komfortabel und stressfrei wie möglich gestalten', score: 1 },
      { text: 'Komfort ist mir wichtig, aber ich bin offen für sanfte Herausforderungen', score: 2 },
      { text: 'Ich suche eine Balance zwischen Komfort und persönlichem Wachstum', score: 3 },
      { text: 'Persönliches Wachstum ist mir wichtiger als Bequemlichkeit', score: 4 },
      { text: 'Ich suche bewusst nach Herausforderungen, die mich weiterbringen', score: 5 }
    ]
  },
  {
    id: 'g2',
    category: 'growth_vs_komfort',
    text: 'Wie gehst du mit Misserfolgen und Rückschlägen um?',
    options: [
      { text: 'Ich vermeide Situationen, wo ich scheitern könnte', score: 1 },
      { text: 'Rückschläge demotivieren mich stark und lange', score: 2 },
      { text: 'Ich brauche Zeit, um mich zu erholen, lerne dann aber daraus', score: 3 },
      { text: 'Ich sehe sie als Lernchance und komme schnell wieder auf die Beine', score: 4 },
      { text: 'Sie motivieren mich erst recht und machen mich stärker', score: 5 }
    ]
  },

  // Konformität vs. Rebell (2 Fragen)
  {
    id: 'k1',
    category: 'konformitaet_vs_rebell',
    text: 'Wie wichtig ist dir die Meinung und Zustimmung deiner Familie und Freunde für wichtige Lebensentscheidungen?',
    options: [
      { text: 'Extrem wichtig, ich entscheide nie gegen ihren Willen', score: 1 },
      { text: 'Sehr wichtig, ich brauche ihre Zustimmung', score: 2 },
      { text: 'Wichtig, aber ich entscheide am Ende selbst', score: 3 },
      { text: 'Weniger wichtig, ich höre zu, aber folge meinem Weg', score: 4 },
      { text: 'Unwichtig, ich treffe meine Entscheidungen unabhängig', score: 5 }
    ]
  },
  {
    id: 'k2',
    category: 'konformitaet_vs_rebell',
    text: 'Wie stehst du zu gesellschaftlichen Normen und Erwartungen?',
    options: [
      { text: 'Ich folge ihnen strikt, sie geben mir Orientierung', score: 1 },
      { text: 'Ich orientiere mich daran, weiche aber manchmal ab', score: 2 },
      { text: 'Ich respektiere sie, aber denke eigenständig', score: 3 },
      { text: 'Ich hinterfrage sie kritisch und gehe oft eigene Wege', score: 4 },
      { text: 'Ich definiere meine eigenen Regeln und Werte', score: 5 }
    ]
  },

  // Finanzielle Situation (2 Fragen)
  {
    id: 'f1',
    category: 'finanzielle_situation',
    text: 'Wie würdest du deine aktuelle finanzielle Situation für eine Auswanderung einschätzen?',
    options: [
      { text: 'Sehr schlecht, ich lebe von Gehalt zu Gehalt', score: 1 },
      { text: 'Knapp, ich habe wenig bis gar keine Rücklagen', score: 2 },
      { text: 'Okay, ich habe einige Monate Puffer', score: 3 },
      { text: 'Gut, ich habe solide Rücklagen für eine Auswanderung', score: 4 },
      { text: 'Sehr gut, Geld ist kein limitierender Faktor', score: 5 }
    ]
  },
  {
    id: 'f2',
    category: 'finanzielle_situation',
    text: 'Wie gehst du mit finanzieller Planung um?',
    options: [
      { text: 'Ich plane nicht und lebe spontan von Tag zu Tag', score: 1 },
      { text: 'Ich plane kurzfristig, meist nur wenige Wochen voraus', score: 2 },
      { text: 'Ich plane mittelfristig und habe einen groben Überblick', score: 3 },
      { text: 'Ich plane strukturiert und langfristig', score: 4 },
      { text: 'Ich habe detaillierte Finanzpläne und mehrere Szenarien', score: 5 }
    ]
  },

  // Wertekompass (1 Frage)
  {
    id: 'w1',
    category: 'wertekompass',
    text: 'Was ist dir im Leben am wichtigsten?',
    options: [
      { text: 'Sicherheit, Stabilität und das Bewahren von Traditionen', score: 1 },
      { text: 'Familie, enge Beziehungen und Harmonie', score: 2 },
      { text: 'Work-Life-Balance und persönliches Wohlbefinden', score: 3 },
      { text: 'Persönliche Entwicklung und neue Erfahrungen', score: 4 },
      { text: 'Freiheit, Abenteuer und Selbstverwirklichung', score: 5 }
    ]
  }
];

export const getResultType = (totalScore: number): string => {
  // Total possible score: 15 questions * 5 points = 75 points
  if (totalScore >= 60) return 'Ausgezeichnet vorbereitet';
  if (totalScore >= 45) return 'Gut vorbereitet';
  if (totalScore >= 30) return 'Teilweise vorbereitet';
  return 'Noch nicht bereit';
};

export const getResultDetails = (resultType: string) => {
  const results = {
    'Ausgezeichnet vorbereitet': {
      title: 'Ausgezeichnet vorbereitet! 🌟',
      description: 'Du bist mental und emotional hervorragend auf eine Auswanderung vorbereitet. Du bringst die perfekte Mischung aus Mut, Flexibilität und Realismus mit.',
      color: 'text-green-600'
    },
    'Gut vorbereitet': {
      title: 'Gut vorbereitet! 🚀',
      description: 'Du hast sehr gute Grundvoraussetzungen für eine Auswanderung. Mit ein wenig zusätzlicher Vorbereitung bist du bereit für das Abenteuer.',
      color: 'text-blue-600'
    },
    'Teilweise vorbereitet': {
      title: 'Teilweise vorbereitet 🤔',
      description: 'Du hast eine solide Basis, aber es gibt noch einige Bereiche, in denen du dich weiterentwickeln könntest, um optimal für das Auswanderer-Leben gerüstet zu sein.',
      color: 'text-yellow-600'
    },
    'Noch nicht bereit': {
      title: 'Noch nicht bereit 🏠',
      description: 'Momentan scheinst du noch stark an dein aktuelles Umfeld gebunden zu sein. Das ist völlig okay! Wenn der Wunsch nach Veränderung wächst, gibt es viele Wege, sich weiterzuentwickeln.',
      color: 'text-red-600'
    }
  };
  return results[resultType as keyof typeof results];
};

export const getRecommendations = (categoryScores: Record<string, number>): string[] => {
  const recommendations: string[] = [];
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score < 3.5) {
      switch (category) {
        case 'veraenderungsbereitschaft':
          recommendations.push('🔄 Stärke deine Veränderungsbereitschaft: Übe dich in kleinen Veränderungen - nimm bewusst neue Wege zur Arbeit, probiere neue Hobbys aus oder verändere deine Routine schrittweise.');
          break;
        case 'sicherheitsbeduerfnis':
          recommendations.push('🎯 Arbeite an deiner Risikoakzeptanz: Beginne mit kleinen, kontrollierten Risiken und baue Vertrauen in deine Anpassungsfähigkeit auf. Sicherheit ist wichtig, aber übermäßige Vorsicht kann Chancen verhindern.');
          break;
        case 'anpassungsfaehigkeit':
          recommendations.push('🌍 Verbessere deine Anpassungsfähigkeit: Erweitere deinen kulturellen Horizont durch Reisen, lerne Sprachen und tausche dich mit Menschen aus anderen Kulturen aus.');
          break;
        case 'risikobereitschaft':
          recommendations.push('💪 Erhöhe deine Risikobereitschaft: Stärke dein Selbstvertrauen, indem du dir kleine Ziele außerhalb deiner Komfortzone setzt und deine Erfolge feierst.');
          break;
        case 'growth_vs_komfort':
          recommendations.push('📚 Entwickle ein Growth Mindset: Sieh Herausforderungen als Wachstumschancen und investiere bewusst in deine persönliche Entwicklung statt nur nach Komfort zu streben.');
          break;
        case 'konformitaet_vs_rebell':
          recommendations.push('🦋 Stärke deine Unabhängigkeit: Übe dich darin, eigene Entscheidungen zu treffen und zu deinen Werten zu stehen, auch wenn andere nicht zustimmen.');
          break;
        case 'finanzielle_situation':
          recommendations.push('💰 Verbessere deine finanzielle Basis: Erstelle einen konkreten Sparplan, reduziere unnötige Ausgaben und baue systematisch Rücklagen für eine Auswanderung auf.');
          break;
        case 'wertekompass':
          recommendations.push('🧭 Reflektiere deine Werte: Überlege dir genau, was dir im Leben wirklich wichtig ist und wie eine Auswanderung diese Werte unterstützen oder herausfordern könnte.');
          break;
      }
    }
  });
  
  // Add positive recommendations for high scores
  Object.entries(categoryScores).forEach(([category, score]) => {
    if (score >= 4.5) {
      switch (category) {
        case 'veraenderungsbereitschaft':
          recommendations.push('✅ Deine Veränderungsbereitschaft ist ausgezeichnet - nutze diese Stärke als Fundament für deine Auswanderungspläne!');
          break;
        case 'risikobereitschaft':
          recommendations.push('🚀 Deine Risikobereitschaft ist hervorragend - du bist bereit, kalkulierte Chancen zu ergreifen!');
          break;
        case 'anpassungsfaehigkeit':
          recommendations.push('🌟 Deine Anpassungsfähigkeit ist ausgezeichnet - du wirst dich schnell in neue Umgebungen einfinden!');
          break;
      }
    }
  });
  
  if (recommendations.length === 0) {
    recommendations.push('🎉 Du bist bereits sehr gut aufgestellt! Nutze deine ausgewogenen Fähigkeiten und vertraue auf deine Stärken für deine Auswanderungspläne.');
  }
  
  return recommendations;
};
