import { Loader2 } from "lucide-react";

export const FullScreenLoading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary mb-8">PawScan AI</h1>
      <div className="flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <p className="text-lg text-gray-600">Analyzing ingredients...</p>
      </div>
    </div>
  );
};