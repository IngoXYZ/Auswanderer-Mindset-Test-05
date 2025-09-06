
// Mailchimp Service - über Backend API Route (CORS-sicher)
export interface MailchimpSubscription {
  email: string;
  name: string;
  tags: string[];
  mergeFields?: Record<string, any>;
}

export async function addToMailchimp(subscription: MailchimpSubscription): Promise<boolean> {
  try {
    console.log('📮 Adding to Mailchimp via backend API...');
    console.log('📧 Email:', subscription.email);
    console.log('🏷️ Tags:', subscription.tags);

    const response = await fetch('/api/mailchimp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Successfully added to Mailchimp:', result);
      return true;
    } else {
      console.error('❌ Mailchimp subscription failed:', result.error);
      return false;
    }
  } catch (error) {
    console.error('❌ Mailchimp service error:', error);
    return false;
  }
}

// Auswanderer Test spezifische Tags
export function getAuswandererTags(resultType: string, totalScore: number, maxScore: number): string[] {
  const scorePercentage = Math.round((totalScore / maxScore) * 100);
  
  const baseTags = [
    'Auswanderer Test',
    'Migration Interest',
    `Score: ${scorePercentage}%`,
    `Type: ${resultType}`
  ];

  // Score-basierte Tags
  if (scorePercentage >= 75) {
    baseTags.push('High Score', 'Ready to Migrate', 'Premium Lead');
  } else if (scorePercentage >= 60) {
    baseTags.push('Medium Score', 'Needs Planning', 'Potential Client');
  } else {
    baseTags.push('Low Score', 'Early Interest', 'Education Needed');
  }

  return baseTags;
}

export function getAuswandererMergeFields(submission: any): Record<string, any> {
  const scorePercentage = Math.round((submission.totalScore / submission.maxScore) * 100);
  
  return {
    ASCORE: submission.totalScore,
    AMAXSCORE: submission.maxScore,
    APERCENT: scorePercentage,
    ARESULT: submission.resultType,
    ADATE: submission.timestamp || new Date().toISOString().split('T')[0],
    // Kategorie-Scores
    ACHANGE: submission.categoryScores?.veraenderungsbereitschaft?.toFixed(1) || 'N/A',
    AADAPT: submission.categoryScores?.anpassungsfaehigkeit?.toFixed(1) || 'N/A',
    ARISK: submission.categoryScores?.risikobereitschaft?.toFixed(1) || 'N/A',
    AFINANCE: submission.categoryScores?.finanzielle_situation?.toFixed(1) || 'N/A',
    AVALUES: submission.categoryScores?.wertekompass?.toFixed(1) || 'N/A'
  };
}
