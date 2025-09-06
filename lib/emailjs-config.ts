
// EmailJS Konfiguration
// WICHTIG: Diese Werte müssen durch deine echten EmailJS Credentials ersetzt werden!

export const EMAILJS_CONFIG = {
  // Ersetze mit deinen echten EmailJS Werten:
  serviceId: 'service_auswanderer',      // Dein EmailJS Service ID
  templateId: 'template_quiz_results',   // Dein EmailJS Template ID  
  publicKey: 'your_public_key_here'      // Dein EmailJS Public Key
};

// EmailJS Template Beispiel:
// 
// Betreff: Neue Auswanderer-Test Teilnahme - {{user_name}}
//
// Inhalt:
// Hallo,
// 
// ein neuer Teilnehmer hat den Auswanderer-Mindset Test ausgefüllt:
//
// TEILNEHMER-DATEN:
// Name: {{user_name}}
// E-Mail: {{user_email}}
// Datum: {{submission_date}}
//
// QUIZ-ERGEBNISSE:
// Gesamtpunktzahl: {{total_score}}/{{max_score}}
// Auswanderer-Typ: {{result_type}}
//
// KATEGORIE-SCORES:
// • Veränderungsbereitschaft: {{veraenderungsbereitschaft_score}}/5
// • Anpassungsfähigkeit: {{anpassungsfaehigkeit_score}}/5
// • Risikobereitschaft: {{risikobereitschaft_score}}/5
// • Growth vs. Komfort: {{growth_vs_komfort_score}}/5
// • Konformität vs. Rebell: {{konformitaet_vs_rebell_score}}/5
// • Finanzielle Situation: {{finanzielle_situation_score}}/5
// • Wertekompass: {{wertekompass_score}}/5
// • Sicherheitsbedürfnis: {{sicherheitsbeduerfnis_score}}/5
//
// EMPFEHLUNGEN:
// {{recommendations}}
//
// Viele Grüße,
// The Small Reset Auswanderer-Test
