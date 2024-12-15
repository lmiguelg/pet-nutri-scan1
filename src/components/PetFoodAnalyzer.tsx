import { useEffect } from "react";
import { AnalysisSection } from "./AnalysisSection";
import { AnalysisHistory } from "./AnalysisHistory";
import { FullScreenLoading } from "./FullScreenLoading";
import { useAnalysis } from "@/hooks/useAnalysis";
import type { PetInfo } from "@/types/pet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PetFoodAnalyzerProps {
  selectedPet: PetInfo;
}

export const PetFoodAnalyzer = ({ selectedPet }: PetFoodAnalyzerProps) => {
  const { 
    analysis, 
    setAnalysis, 
    isAnalyzing, 
    analyzeImage,
    isSubscribed,
    scanCount,
    startCheckout
  } = useAnalysis(selectedPet);

  // Clear analysis when selected pet changes
  useEffect(() => {
    if (setAnalysis) {
      setAnalysis(null);
    }
  }, [selectedPet.id, setAnalysis]);

  return (
    <>
      {isAnalyzing && <FullScreenLoading />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {!isSubscribed && (
            <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-yellow-600" />
                  Subscription Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  You have used {scanCount || 0}/2 free scans.
                  {scanCount >= 2 ? " Upgrade to continue analyzing pet food!" : ""}
                </p>
                <Button
                  onClick={startCheckout}
                  className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700"
                >
                  Upgrade to Premium - $2.99/week
                </Button>
              </CardContent>
            </Card>
          )}
          <AnalysisSection 
            analysis={analysis} 
            onImageCapture={analyzeImage}
          />
        </div>
        <AnalysisHistory petId={selectedPet.id} />
      </div>
    </>
  );
};