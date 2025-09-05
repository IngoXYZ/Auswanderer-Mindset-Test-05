
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight } from "lucide-react";
import { saveUserSession } from '@/lib/local-storage';
import { initializeEmailJS } from '@/lib/emailjs-service';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";

export default function UserForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // EmailJS initialisieren
    initializeEmailJS();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim()) {
      toast.error('Bitte fülle alle Felder aus');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Bitte gib eine gültige E-Mail-Adresse ein');
      return;
    }

    setIsLoading(true);
    
    try {
      // Save user session locally
      const userId = saveUserSession({
        name: name.trim(),
        email: email.trim().toLowerCase()
      });

      console.log('✅ User session saved:', userId);
      toast.success('Daten gespeichert! Quiz startet...');
      
      // Navigate to quiz
      setTimeout(() => {
        router.push('/quiz');
      }, 1000);
      
    } catch (error) {
      console.error('Error saving user:', error);
      toast.error('Fehler beim Speichern der Daten');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-3xl font-bold text-black mb-4">
          Starte jetzt deinen Test
        </CardTitle>
        <p className="text-lg text-gray-700">
          Gib deine Daten ein, um deine persönliche Auswertung zu erhalten
        </p>
      </CardHeader>
      
      <CardContent className="px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Vorname *
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Dein Vorname"
              required
              className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              E-Mail-Adresse *
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.com"
              required
              className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
              disabled={isLoading}
            />
          </div>
          
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading || !name.trim() || !email.trim()}
              className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-orange-500 hover:from-blue-700 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Wird verarbeitet...
                </>
              ) : (
                <>
                  Test starten
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
          
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              Deine Daten werden vertraulich behandelt und nur für die Auswertung verwendet.
              Die Ergebnisse erhältst du sofort nach Abschluss des Tests.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
