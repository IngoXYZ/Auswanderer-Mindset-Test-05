
// EmailJS Service für direktes E-Mail-Versenden
import emailjs from '@emailjs/browser';

// EmailJS Konfiguration - NUR 3 KOMBINIERTE TEMPLATES
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_business40',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key_here'
};

// Mailchimp Konfiguration
const MAILCHIMP_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY || '',
  serverPrefix: process.env.NEXT_PUBLIC_MAILCHIMP_SERVER_PREFIX || 'us1', // z.B. us1, us2, etc.
  audienceId: process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID || ''
};

export interface QuizSubmission {
  name: string;
  email: string;
  totalScore: number;
  maxScore: number;
  resultType: string;
  categoryScores: Record<string, number>;
  recommendations: string[];
  timestamp: string;
}

// KOMBINIERTE E-MAIL (Kunde + Admin in einem Template)
export async function sendCombinedNotification(submission: QuizSubmission): Promise<boolean> {
  try {
    console.log('🚀 Starting email send process...');
    console.log('📊 Submission data:', {
      name: submission.name,
      email: submission.email,
      score: submission.totalScore,
      type: submission.resultType
    });
    
    // Check configuration first
    console.log('🔧 Checking EmailJS configuration...');
    console.log('Service ID:', EMAILJS_CONFIG.serviceId);
    console.log('Template ID:', EMAILJS_CONFIG.templateId);
    console.log('Public Key:', EMAILJS_CONFIG.publicKey ? 'Set (hidden)' : 'Not set');
    
    if (!EMAILJS_CONFIG.serviceId || EMAILJS_CONFIG.serviceId === 'service_auswanderer') {
      console.error('❌ EmailJS Service ID not configured properly - still using old default');
      return false;
    }
    // Template basierend auf Score auswählen
    const templateId = getCombinedTemplateId(submission);
    console.log('📋 Using combined template:', templateId);
    if (!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'your_public_key_here') {
      console.error('❌ EmailJS Public Key not configured properly - still using placeholder');
      return false;
    }
    
    // CTA und Content basierend auf Ergebnis
    const ctaText = getAuswandererCTA(submission);
    const nextSteps = getAuswandererNextSteps(submission);
    const inspiration = getAuswandererInspiration(submission);

    // KOMBINIERTE Template Parameters (für Kunde UND Admin)
    const templateParams = {
      // EMPFÄNGER INFO
      user_name: submission.name,
      user_email: submission.email,
      admin_email: process.env.NEXT_PUBLIC_RECIPIENT_EMAIL || 'admin@example.com',
      
      // TESTERGEBNISSE
      total_score: submission.totalScore.toString(),
      max_score: submission.maxScore.toString(),
      result_type: submission.resultType,
      submission_date: submission.timestamp,
      
      // DETAILLIERTE KATEGORIE-SCORES für Auswanderer
      veraenderungsbereitschaft_score: (submission.categoryScores.veraenderungsbereitschaft || 0).toFixed(1),
      sicherheitsbeduerfnis_score: (submission.categoryScores.sicherheitsbeduerfnis || 0).toFixed(1),
      anpassungsfaehigkeit_score: (submission.categoryScores.anpassungsfaehigkeit || 0).toFixed(1),
      risikobereitschaft_score: (submission.categoryScores.risikobereitschaft || 0).toFixed(1),
      growth_vs_komfort_score: (submission.categoryScores.growth_vs_komfort || 0).toFixed(1),
      konformitaet_vs_rebell_score: (submission.categoryScores.konformitaet_vs_rebell || 0).toFixed(1),
      finanzielle_situation_score: (submission.categoryScores.finanzielle_situation || 0).toFixed(1),
      wertekompass_score: (submission.categoryScores.wertekompass || 0).toFixed(1),
      
      // PERSONALISIERTE KUNDEN-INHALTE
      recommendations: submission.recommendations.join('\n\n'),
      next_steps: nextSteps,
      inspiration: inspiration,
      cta_text: ctaText,
      
      // E-MAIL-SERIE VORSCHAU
      email_preview: `In den nächsten 6 E-Mails erhältst du:
• Woche 1: Das perfekte Auswanderer-Zielland finden
• Woche 2: Visa & Aufenthaltsgenehmigung meistern
• Woche 3: Finanzen & Steuern international organisieren
• Woche 4: Job oder Business im Ausland starten
• Woche 5: Integration & Netzwerk aufbauen
• Woche 6: Dein neues Leben erfolgreich gestalten`,
      
      // STÄRKEN & SCHWÄCHEN
      top_strengths: getTopStrengths(submission.categoryScores),
      improvement_areas: getImprovementAreas(submission.categoryScores),
      
      // ADMIN QUICK-INFO
      category_breakdown: Object.entries(submission.categoryScores)
        .map(([category, score]) => `${formatCategoryName(category)}: ${(score as number).toFixed(1)}/5`)
        .join('\n'),
        
      // FALLBACK MESSAGE
      message: `Business Test 40+ - Teilnehmer: ${submission.name}, E-Mail: ${submission.email}, Score: ${submission.totalScore}/${submission.maxScore}, Ergebnis: ${submission.resultType}`
    };
    
    console.log('📧 Template parameters prepared:', templateParams);

    console.log('📧 Sending email via EmailJS...');
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );

    console.log('✅ Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('❌ EmailJS send failed:', error);
    return false;
  }
}



// MAILCHIMP INTEGRATION (NEU!)
export async function addToMailchimp(submission: QuizSubmission): Promise<boolean> {
  try {
    console.log('📮 Adding to Mailchimp...');
    
    if (!MAILCHIMP_CONFIG.apiKey || !MAILCHIMP_CONFIG.audienceId) {
      console.log('⚠️ Mailchimp not configured, skipping...');
      return false;
    }
    
    // Tags generieren
    const tags = generateMailchimpTags(submission);
    console.log('🏷️ Mailchimp tags:', tags);
    
    // Schwäche-basierte Tags
    const weaknessTags = getWeaknessTags(submission.categoryScores);
    
    const mailchimpData = {
      email_address: submission.email,
      status: 'subscribed',
      merge_fields: {
        FNAME: submission.name.split(' ')[0] || submission.name,
        LNAME: submission.name.split(' ').slice(1).join(' ') || '',
        TESTSCORE: submission.totalScore,
        MAXSCORE: submission.maxScore,
        RESULTTYPE: submission.resultType,
        TESTDATE: submission.timestamp
      },
      tags: [...tags, ...weaknessTags]
    };
    
    // Mailchimp API Call
    const response = await fetch(`https://${MAILCHIMP_CONFIG.serverPrefix}.api.mailchimp.com/3.0/lists/${MAILCHIMP_CONFIG.audienceId}/members`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${MAILCHIMP_CONFIG.apiKey}`)}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mailchimpData)
    });
    
    if (response.ok) {
      console.log('✅ Successfully added to Mailchimp');
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Mailchimp error:', error);
      return false;
    }
  } catch (error) {
    console.error('❌ Mailchimp integration failed:', error);
    return false;
  }
}

// HELPER FUNCTIONS
// TEMPLATE AUSWAHL basierend auf Score (3 kombinierte Templates)
function getCombinedTemplateId(submission: QuizSubmission): string {
  const scorePercentage = (submission.totalScore / submission.maxScore) * 100;
  
  if (scorePercentage >= 75) {
    return process.env.NEXT_PUBLIC_EMAILJS_HIGH_TEMPLATE || 'template_auswanderer_high';
  } else if (scorePercentage >= 60) {
    return process.env.NEXT_PUBLIC_EMAILJS_MEDIUM_TEMPLATE || 'template_auswanderer_medium';
  } else {
    return process.env.NEXT_PUBLIC_EMAILJS_LOW_TEMPLATE || 'template_auswanderer_low';
  }
}

function getCustomerCTA(submission: QuizSubmission): string {
  const scorePercentage = (submission.totalScore / submission.maxScore) * 100;
  
  if (scorePercentage >= 75) {
    return "🚀 Du bist bereit! Buche jetzt dein kostenloses Strategiegespräch und starte in den nächsten 30 Tagen!";
  } else if (scorePercentage >= 60) {
    return "💡 Schau dir unseren Blog an und hol dir die fehlenden Puzzleteile für deinen Erfolg!";
  } else {
    return "📚 Beginne mit unserem kostenlosen Starter-Guide und baue deine Basis auf!";
  }
}

function getNextSteps(submission: QuizSubmission): string {
  const scorePercentage = (submission.totalScore / submission.maxScore) * 100;
  
  if (scorePercentage >= 75) {
    return `✅ Du bist bereits sehr gut vorbereitet!
    
    Deine nächsten Schritte:
    1. Geschäftsidee konkretisieren
    2. Businessplan erstellen  
    3. Erste Kunden finden
    4. Rechtliche Grundlagen klären`;
  } else if (scorePercentage >= 60) {
    return `⚡ Du bist auf dem richtigen Weg!
    
    Fokussiere dich auf:
    1. Schwächste Bereiche stärken
    2. Digitale Skills ausbauen
    3. Netzwerk erweitern
    4. Finanzielle Planung optimieren`;
  } else {
    return `🌱 Jeder Experte war mal Anfänger!
    
    Starte hier:
    1. Unternehmer-Mindset entwickeln
    2. Grundlagen-Wissen aufbauen
    3. Mentor oder Coach finden
    4. Schritt-für-Schritt Plan erstellen`;
  }
}

function getBusinessInspiration(submission: QuizSubmission): string {
  const scorePercentage = (submission.totalScore / submission.maxScore) * 100;
  
  if (scorePercentage >= 75) {
    return `🌟 SUCCESS STORY: Maria (47) war Buchhalterin und führt heute ein erfolgreiches Online-Business mit 6-stelligem Jahresumsatz. Sie startete mit dem gleichen Score wie du!
    
    "Der Test hat mir gezeigt: Ich bin bereit. 6 Monate später hatte ich meine ersten 10.000€ Umsatz." - Maria K.`;
  } else if (scorePercentage >= 60) {
    return `💪 INSPIRATION: Thomas (42) hatte einen ähnlichen Score wie du. Nach 6 Monaten Vorbereitung gründete er erfolgreich sein Beratungsunternehmen.
    
    "Die größte Hürde war mein eigener Zweifel. Mit dem richtigen Plan wurde alles möglich." - Thomas M.`;
  } else {
    return `🚀 MUTMACHER: Sandra (45) startete mit einem niedrigeren Score als du. Heute ist sie erfolgreiche Online-Trainerin.
    
    "Ich dachte, es ist zu spät. Aber mit 45 war es der perfekte Zeitpunkt für mein Business!" - Sandra L.`;
  }
}

function getTopStrengths(categoryScores: any): string {
  const scores = Object.entries(categoryScores)
    .map(([category, score]) => ({ category: formatCategoryName(category), score: score as number }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
    
  return scores.map(s => `• ${s.category}: ${s.score.toFixed(1)}/5`).join('\n');
}

function getImprovementAreas(categoryScores: any): string {
  const scores = Object.entries(categoryScores)
    .map(([category, score]) => ({ category: formatCategoryName(category), score: score as number }))
    .sort((a, b) => a.score - b.score)
    .slice(0, 2);
    
  return scores.map(s => `• ${s.category}: ${s.score.toFixed(1)}/5`).join('\n');
}

function formatCategoryName(category: string): string {
  const mapping: { [key: string]: string } = {
    'unternehmer_mindset': 'Unternehmer-Mindset',
    'risikobereitschaft': 'Risikobereitschaft',
    'technische_affinitaet': 'Technische Affinität',
    'ai_bereitschaft': 'AI-Bereitschaft',
    'finanzielle_situation': 'Finanzielle Situation',
    'work_life_balance': 'Work-Life-Balance',
    'lernbereitschaft': 'Lernbereitschaft',
    'netzwerk_marketing': 'Netzwerk & Marketing'
  };
  return mapping[category] || category;
}

function generateMailchimpTags(submission: QuizSubmission): string[] {
  const tags = ['auswanderer_test_participant'];
  
  // Score Range
  const scorePercentage = (submission.totalScore / submission.maxScore) * 100;
  if (scorePercentage >= 80) tags.push('score_80_100');
  else if (scorePercentage >= 60) tags.push('score_60_79');
  else if (scorePercentage >= 40) tags.push('score_40_59');
  else tags.push('score_0_39');
  
  // Result Type
  tags.push(submission.resultType.toLowerCase().replace(/\s+/g, '_'));
  
  return tags;
}

function getWeaknessTags(categoryScores: any): string[] {
  const tags: string[] = [];
  
  Object.entries(categoryScores).forEach(([category, score]) => {
    if ((score as number) < 3) {
      tags.push(`needs_${category}_help`);
    }
  });
  
  return tags;
}

// EmailJS initialisieren
export function initializeEmailJS() {
  emailjs.init(EMAILJS_CONFIG.publicKey);
}
