
import { NextRequest, NextResponse } from 'next/server';
import { questions, categories, getResultType, getRecommendations } from '@/lib/questions';

export const dynamic = "force-dynamic";
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting quiz submission (EmailJS version)...');
    
    const { userId, answers, userName, userEmail } = await request.json();

    if (!userId || !answers || !userName || !userEmail) {
      return NextResponse.json(
        { error: 'Alle Daten sind erforderlich' },
        { status: 400 }
      );
    }

    // Calculate scores
    let totalScore = 0;
    const categoryScores: Record<string, number[]> = {};

    // Initialize category score arrays
    Object.keys(categories).forEach(category => {
      categoryScores[category] = [];
    });

    // Calculate scores per category
    for (const [questionId, score] of Object.entries(answers)) {
      const question = questions.find(q => q.id === questionId);
      if (!question) continue;

      totalScore += Number(score);
      categoryScores[question.category]?.push(Number(score));
    }

    // Calculate average scores per category
    const finalCategoryScores: Record<string, number> = {};
    Object.entries(categoryScores).forEach(([category, scores]) => {
      if (scores.length > 0) {
        finalCategoryScores[category] = scores.reduce((a, b) => a + b, 0) / scores.length;
      }
    });

    const resultType = getResultType(totalScore);
    const recommendations = getRecommendations(finalCategoryScores);

    // Create result object
    const result = {
      id: Date.now(),
      userId,
      userName,
      userEmail,
      totalScore,
      maxScore: questions.length * 5, // 5 points max per question
      resultType,
      categoryScores: finalCategoryScores,
      recommendations,
      timestamp: new Date().toLocaleDateString('de-DE') + ' ' + new Date().toLocaleTimeString('de-DE')
    };

    console.log('✅ Quiz results calculated successfully');

    return NextResponse.json({ resultId: result.id, result });
  } catch (error) {
    console.error('❌ Error submitting quiz:', error);
    return NextResponse.json(
      { error: 'Fehler beim Speichern der Quiz-Antworten' },
      { status: 500 }
    );
  }
}
