import { AnalysisSection } from "./AnalysisSection";
import { AnalysisHistory } from "./AnalysisHistory";
import { FullScreenLoading } from "./FullScreenLoading";
import { useAnalysis } from "@/hooks/useAnalysis";
import type { PetInfo } from "@/types/pet";

interface PetFoodAnalyzerProps {
  selectedPet: PetInfo;
}

export const PetFoodAnalyzer = ({ selectedPet }: PetFoodAnalyzerProps) => {
  const { analysis, setAnalysis, isAnalyzing, analyzeImage } = useAnalysis(selectedPet);

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
        <AnalysisSection 
          analysis={analysis} 
          onImageCapture={analyzeImage}
        />
        <AnalysisHistory petId={selectedPet.id} />
      </div>
    </>
  );
};