
import ResultsClient from '@/components/results-client';
import { AppHeader } from '@/components/app-header';

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-white">
      <AppHeader />

      <div className="py-8 px-4">
        <ResultsClient />
      </div>
    </div>
  );
}
