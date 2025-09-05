
export function AppHeader() {
  return (
    <header className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-black tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Auswanderer Mindset Test
              </span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}
