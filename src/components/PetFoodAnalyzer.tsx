import { useState, useEffect } from "react";
import { Scanner } from "./Scanner";
import { AnalysisResult } from "./AnalysisResult";
import { AnalysisHistory } from "./AnalysisHistory";
import { LoadingCard } from "./LoadingCard";
import { FullScreenLoading } from "./FullScreenLoading";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { PetInfo } from "@/types/pet";

interface PetFoodAnalyzerProps {
  selectedPet: PetInfo;
}

export const PetFoodAnalyzer = ({ selectedPet }: PetFoodAnalyzerProps) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Clear analysis when selected pet changes
  useEffect(() => {
    setAnalysis(null);
  }, [selectedPet.id]);

  const handleImageCapture = async (image: File) => {
    try {
      setIsAnalyzing(true);
      setAnalysis(null);

      const reader = new FileReader();
      reader.readAsDataURL(image);
      
      reader.onload = async () => {
        const base64Image = reader.result as string;
        
        const response = await fetch('https://ktxnppezwuiulgmbmeip.functions.supabase.co/analyze-nutrition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64Image,
            petInfo: selectedPet,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze image');
        }

        const data = await response.json();
        setAnalysis(data);

        // Store the analysis in the database
        const { error: dbError } = await supabase
          .from('pet_food_analyses')
          .insert({
            pet_id: selectedPet.id,
            analysis_text: data,
            image_data: base64Image,
          });

        if (dbError) {
          console.error('Error saving analysis:', dbError);
          toast({
            title: "Warning",
            description: "Analysis completed but couldn't save to history",
            variant: "destructive",
          });
        }
        
        toast({
          title: "Analysis Complete",
          description: "The nutritional information has been analyzed!",
        });
      };
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Error",
        description: "Failed to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {isAnalyzing && <FullScreenLoading />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Scanner onImageCapture={handleImageCapture} />
          {analysis && <AnalysisResult analysis={analysis} />}
        </div>
        <AnalysisHistory petId={selectedPet.id} />
      </div>
    </>
  );
};