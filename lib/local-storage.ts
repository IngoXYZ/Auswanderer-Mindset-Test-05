
// LocalStorage Management für Sessions
export interface UserSession {
  name: string;
  email: string;
  userId: string;
  timestamp: string;
}

export interface QuizSession {
  userId: string;
  answers: Record<string, number>;
  totalScore: number;
  categoryScores: Record<string, number>;
  resultType: string;
  recommendations: string[];
  timestamp: string;
}

// User Session Management
export function saveUserSession(user: Omit<UserSession, 'userId' | 'timestamp'>): string {
  const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const userSession: UserSession = {
    ...user,
    userId,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('auswanderer_user', JSON.stringify(userSession));
  localStorage.setItem('auswanderer_userId', userId);
  
  return userId;
}

export function getUserSession(): UserSession | null {
  try {
    const sessionData = localStorage.getItem('auswanderer_user');
    return sessionData ? JSON.parse(sessionData) : null;
  } catch {
    return null;
  }
}

export function getUserId(): string | null {
  return localStorage.getItem('auswanderer_userId');
}

// Quiz Session Management
export function saveQuizSession(quizData: Omit<QuizSession, 'timestamp'>): void {
  const quizSession: QuizSession = {
    ...quizData,
    timestamp: new Date().toISOString()
  };
  
  localStorage.setItem('auswanderer_quiz', JSON.stringify(quizSession));
}

export function getQuizSession(): QuizSession | null {
  try {
    const quizData = localStorage.getItem('auswanderer_quiz');
    return quizData ? JSON.parse(quizData) : null;
  } catch {
    return null;
  }
}

// Cleanup
export function clearSession(): void {
  localStorage.removeItem('auswanderer_user');
  localStorage.removeItem('auswanderer_userId');
  localStorage.removeItem('auswanderer_quiz');
}
