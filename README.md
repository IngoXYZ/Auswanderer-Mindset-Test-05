
# Auswanderer Mindset Test - EmailJS Version

## 🚀 Sofort deployment-bereit für Vercel!

### ✅ Features
- 15 Quiz-Fragen in Deutsch
- Responsive Design (thesmallreset.org Style)
- **EmailJS Integration** - Ergebnisse per E-Mail
- **LocalStorage** für Session-Management
- **Keine Datenbank** erforderlich
- Production-ready

## 📧 EmailJS Setup (WICHTIG!)

### 1. EmailJS Account erstellen
1. Gehe zu **emailjs.com**
2. **Registriere** einen kostenlosen Account
3. **Verifiziere** deine E-Mail

### 2. E-Mail Service erstellen
1. Dashboard → **Email Services** → **Add New Service**
2. Wähle **Gmail**, **Outlook** oder anderen Provider
3. **Verbinde** dein E-Mail-Account
4. Kopiere die **Service ID** (z.B. `service_abc123`)

### 3. E-Mail Template erstellen
1. Dashboard → **Email Templates** → **Create New Template**
2. **Template Name**: "Quiz Results"
3. **Template Inhalt**:

```
Betreff: Neue Auswanderer-Test Teilnahme - {{user_name}}

Hallo,

ein neuer Teilnehmer hat den Auswanderer-Mindset Test ausgefüllt:

TEILNEHMER-DATEN:
Name: {{user_name}}
E-Mail: {{user_email}}
Datum: {{submission_date}}

QUIZ-ERGEBNISSE:
Gesamtpunktzahl: {{total_score}}/{{max_score}}
Auswanderer-Typ: {{result_type}}

KATEGORIE-SCORES:
• Anpassungsfähigkeit: {{adaptability_score}}/5
• Risikobereitschaft: {{risk_tolerance_score}}/5
• Finanzielle Situation: {{financial_situation_score}}/5
• Wertekompass: {{values_compass_score}}/5
• Sicherheitsbedürfnis: {{security_needs_score}}/5

EMPFEHLUNGEN:
{{recommendations}}

Viele Grüße,
The Small Reset Auswanderer-Test
```

4. Kopiere die **Template ID** (z.B. `template_xyz789`)

### 4. Public Key kopieren
1. Dashboard → **Account** → **API Keys**
2. Kopiere den **Public Key**

## 🔧 Vercel Environment Variables

Füge in Vercel → Settings → Environment Variables hinzu:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
NEXT_PUBLIC_RECIPIENT_EMAIL=deine@email.com
```

## 🚀 Deployment

### 1. GitHub Upload
- Lösche ALLE Dateien in deinem Repository
- Lade ALLE Dateien aus diesem ZIP ins Root-Verzeichnis hoch

### 2. Vercel Setup
- **Root Directory**: `.` (Punkt)
- **Build Command**: Standard lassen
- **Environment Variables**: EmailJS Konfiguration (siehe oben)

### 3. Das war's!
- Vercel erkennt Next.js automatisch
- Keine Datenbank-Probleme
- Sofort funktionsfähig

## 📊 Wie es funktioniert

1. **User** gibt Name + E-Mail ein → **LocalStorage**
2. **User** füllt Quiz aus → **LocalStorage** 
3. **Quiz-Ergebnisse** werden berechnet
4. **EmailJS** sendet alle Daten per E-Mail an dich
5. **User** sieht sofort seine Ergebnisse

## 🎯 Vorteile

- ✅ **Sofort funktional** auf Vercel
- ✅ **Keine Database-Probleme**
- ✅ **E-Mails automatisch gesammelt**
- ✅ **Vollständige Quiz-Funktionalität**
- ✅ **Responsive Design**

## 📞 Support

Bei Fragen zur EmailJS Konfiguration:
- EmailJS Dokumentation: docs.emailjs.com
- Video-Tutorials verfügbar
- Kostenloser Support-Chat
