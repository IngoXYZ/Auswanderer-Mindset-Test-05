
// EmailJS Konfiguration
// WICHTIG: Diese Werte müssen durch deine echten EmailJS Credentials ersetzt werden!

export const EMAILJS_CONFIG = {
  // Ersetze mit deinen echten EmailJS Werten:
  serviceId: 'service_auswanderer',                   // Dein EmailJS Service ID
  highTemplateId: 'template_auswanderer_high',        // Hoher Score (75%+) - Kunde + Admin
  mediumTemplateId: 'template_auswanderer_medium',    // Mittlerer Score (60-74%) - Kunde + Admin
  lowTemplateId: 'template_auswanderer_low',          // Niedriger Score (<60%) - Kunde + Admin
  publicKey: 'your_public_key_here'                   // Dein EmailJS Public Key
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
//
// ===== KUNDEN-E-MAIL TEMPLATES FÜR AUSWANDERER =====
//
// TEMPLATE 1: HOHER SCORE (75%+) - template_auswanderer_high
// Betreff: 🌍 {{user_name}}, dein Auswanderer-Traum ist zum Greifen nah!
//
// Hallo {{user_name}},
//
// herzlichen Glückwunsch! Dein Auswanderer-Test Ergebnis zeigt:
//
// 🎯 DEIN ERGEBNIS: {{result_type}} ({{total_score}}/{{max_score}} Punkte)
//
// 📊 DEINE TOP-STÄRKEN:
// {{top_strengths}}
//
// 💡 OPTIMIERUNGSBEREICHE:
// {{improvement_areas}}
//
// {{next_steps}}
//
// 🌟 INSPIRATION FÜR DICH:
// {{inspiration}}
//
// 📧 WAS DICH IN DEN NÄCHSTEN 6 E-MAILS ERWARTET:
// {{email_preview}}
//
// {{cta_text}}
//
// Herzliche Grüße,
// Dein Auswanderer-Team
//
// TEMPLATE 2: MITTLERER SCORE (60-74%) - template_auswanderer_med
// Betreff: {{user_name}}, du bist auf dem richtigen Auswanderer-Weg!
//
// TEMPLATE 3: NIEDRIGER SCORE (<60%) - template_auswanderer_low
// Betreff: {{user_name}}, jeder erfolgreiche Auswanderer war mal am Anfang!
