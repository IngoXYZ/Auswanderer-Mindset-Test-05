
'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Mail,
  RotateCcw,
  CheckCircle
} from "lucide-react";
import { categories } from '@/lib/questions';
import { getUserSession, getQuizSession, clearSession } from '@/lib/local-storage';
import { useRouter } from 'next/navigation';

interface ResultData {
  totalScore: number;
  maxScore: number;
  resultType: string;
  categoryScores: Record<string, number>;
  recommendations: string[];
}

export default function ResultsClient() {
  const router = useRouter();
  const [result, setResult] = useState<ResultData | null>(null);
  const [userSession, setUserSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = () => {
      const user = getUserSession();
      const quiz = getQuizSession();

      if (!user || !quiz) {
        router.push('/');
        return;
      }

      setUserSession(user);
      setResult({
        totalScore: quiz.totalScore,
        maxScore: quiz.answers ? Object.keys(quiz.answers).length * 5 : 75,
        resultType: quiz.resultType,
        categoryScores: quiz.categoryScores,
        recommendations: quiz.recommendations
      });
      setLoading(false);
    };

    loadResults();
  }, [router]);

  const handleNewTest = () => {
    clearSession();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Ergebnisse werden geladen...</p>
        </div>
      </div>
    );
  }

  if (!result || !userSession) {
    return null;
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getResultBadgeColor = (resultType: string) => {
    switch (resultType.toLowerCase()) {
      case 'ausgezeichnet vorbereitet':
        return "bg-green-100 text-green-800 border-green-200";
      case 'gut vorbereitet':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'teilweise vorbereitet':
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-600 mr-4" />
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Test abgeschlossen!</h1>
              <p className="text-lg text-gray-600 mt-2">
                Hallo {userSession.name}, hier sind deine Ergebnisse
              </p>
            </div>
          </div>
        </div>

        {/* Gesamtergebnis */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              Dein Auswanderer-Mindset
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${getScoreColor(result.totalScore, result.maxScore)}`}>
                {result.totalScore}
                <span className="text-2xl text-gray-500">/{result.maxScore}</span>
              </div>
              <Badge className={`text-lg px-4 py-2 ${getResultBadgeColor(result.resultType)}`}>
                {result.resultType}
              </Badge>
            </div>

            <Progress 
              value={(result.totalScore / result.maxScore) * 100} 
              className="h-3"
            />
          </CardContent>
        </Card>

        {/* Kategorie-Ergebnisse */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <Target className="w-6 h-6 text-blue-600" />
              Detaillierte Auswertung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {Object.entries(categories).map(([key, category]) => {
                const score = result.categoryScores[key] || 0;
                const percentage = (score / 5) * 100;
                
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{category}</h3>
                      <span className={`font-bold ${getScoreColor(score, 5)}`}>
                        {score.toFixed(1)}/5
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Empfehlungen */}
        <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
              Empfehlungen für dich
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* E-Mail Info */}
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-green-800">
              <Mail className="w-6 h-6" />
              <div>
                <h3 className="font-semibold">Ergebnisse per E-Mail versendet!</h3>
                <p className="text-sm text-green-700 mt-1">
                  Deine Testergebnisse wurden automatisch an uns gesendet. 
                  Du erhältst in Kürze weitere Informationen per E-Mail.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Aktionen */}
        <div className="text-center space-y-4">
          <Button
            onClick={handleNewTest}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Neuen Test starten
          </Button>
          
          <p className="text-sm text-gray-500">
            Möchtest du mit einem anderen Namen einen weiteren Test machen?
          </p>
        </div>
      </div>
    </div>
  );
}
