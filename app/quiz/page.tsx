
import QuizClient from '@/components/quiz-client';
import { AppHeader } from '@/components/app-header';
import { questions } from '@/lib/questions';

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <div className="py-8 px-4">
        <QuizClient />
      </div>
    </div>
  );
}
