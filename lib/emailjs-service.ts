
// EmailJS Service für direktes E-Mail-Versenden
import emailjs from '@emailjs/browser';

// EmailJS Konfiguration aus Environment Variables
const EMAILJS_CONFIG = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_auswanderer',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_quiz_results',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key_here'
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

export async function sendQuizResults(submission: QuizSubmission): Promise<boolean> {
  try {
    // E-Mail Template Daten
    const templateParams = {
      user_name: submission.name,
      user_email: submission.email,
      total_score: submission.totalScore,
      max_score: submission.maxScore,
      result_type: submission.resultType,
      veraenderungsbereitschaft_score: submission.categoryScores.veraenderungsbereitschaft?.toFixed(1) || 'N/A',
      anpassungsfaehigkeit_score: submission.categoryScores.anpassungsfaehigkeit?.toFixed(1) || 'N/A',
      risikobereitschaft_score: submission.categoryScores.risikobereitschaft?.toFixed(1) || 'N/A',
      finanzielle_situation_score: submission.categoryScores.finanzielle_situation?.toFixed(1) || 'N/A',
      wertekompass_score: submission.categoryScores.wertekompass?.toFixed(1) || 'N/A',
      sicherheitsbeduerfnis_score: submission.categoryScores.sicherheitsbeduerfnis?.toFixed(1) || 'N/A',
      growth_vs_komfort_score: submission.categoryScores.growth_vs_komfort?.toFixed(1) || 'N/A',
      konformitaet_vs_rebell_score: submission.categoryScores.konformitaet_vs_rebell?.toFixed(1) || 'N/A',
      recommendations: submission.recommendations.join('\n• '),
      submission_date: submission.timestamp,
      message: `
Neuer Auswanderer-Mindset Test wurde ausgefüllt!

Teilnehmer: ${submission.name}
E-Mail: ${submission.email}
Datum: ${submission.timestamp}

ERGEBNISSE:
Gesamtpunktzahl: ${submission.totalScore}/${submission.maxScore}
Auswanderer-Typ: ${submission.resultType}

KATEGORIE-AUSWERTUNG:
• Veränderungsbereitschaft: ${submission.categoryScores.veraenderungsbereitschaft?.toFixed(1) || 'N/A'}/5
• Anpassungsfähigkeit: ${submission.categoryScores.anpassungsfaehigkeit?.toFixed(1) || 'N/A'}/5
• Risikobereitschaft: ${submission.categoryScores.risikobereitschaft?.toFixed(1) || 'N/A'}/5  
• Growth vs. Komfort: ${submission.categoryScores.growth_vs_komfort?.toFixed(1) || 'N/A'}/5
• Konformität vs. Rebell: ${submission.categoryScores.konformitaet_vs_rebell?.toFixed(1) || 'N/A'}/5
• Finanzielle Situation: ${submission.categoryScores.finanzielle_situation?.toFixed(1) || 'N/A'}/5
• Wertekompass: ${submission.categoryScores.wertekompass?.toFixed(1) || 'N/A'}/5
• Sicherheitsbedürfnis: ${submission.categoryScores.sicherheitsbeduerfnis?.toFixed(1) || 'N/A'}/5

EMPFEHLUNGEN:
• ${submission.recommendations.join('\n• ')}
      `
    };

    console.log('📧 Sending email via EmailJS...');
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
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

// EmailJS initialisieren
export function initializeEmailJS() {
  // Diese werden später durch echte EmailJS Credentials ersetzt
  emailjs.init(EMAILJS_CONFIG.publicKey);
}
