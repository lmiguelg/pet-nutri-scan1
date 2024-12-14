import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { PetInfo } from "@/types/pet";

export const useAnalysis = (selectedPet: PetInfo) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const analyzeImage = async (image: File) => {
    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const reader = new FileReader();
      
      const readerPromise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });

      const base64Image = await readerPromise as string;
      
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

  return {
    analysis,
    setAnalysis,
    isAnalyzing,
    analyzeImage,
  };
};