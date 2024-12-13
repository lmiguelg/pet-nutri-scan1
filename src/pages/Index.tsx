import { useState } from "react";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Scanner } from "@/components/Scanner";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { PetInfo } from "@/types/pet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleOnboardingComplete = async (info: PetInfo) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to save pet information",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('pets')
        .insert({
          user_id: user.id,
          name: info.name,
          pet_type: info.petType,
          breed_id: info.breedId,
          gender: info.gender,
          age: info.age,
          weight: info.weight,
          allergies: info.allergies,
          health_issues: info.healthIssues,
        });

      if (error) throw error;

      setPetInfo(info);
      setIsOnboarded(true);
      
      toast({
        title: "Success",
        description: "Pet information saved successfully!",
      });
    } catch (error) {
      console.error('Error saving pet information:', error);
      toast({
        title: "Error",
        description: "Failed to save pet information. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageCapture = async (image: File) => {
    if (!petInfo) {
      toast({
        title: "Error",
        description: "Pet information is required before analyzing food",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysis(null);

      // Convert the image to base64
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
            petInfo,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze image');
        }

        const data = await response.json();
        setAnalysis(data.choices[0].message.content);
        
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-200 py-8 px-4">
      <div className="max-w-md mx-auto relative">
        <Button
          variant="outline"
          className="absolute right-0 top-0"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
        {!isOnboarded ? (
          <OnboardingForm onComplete={handleOnboardingComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome, {petInfo?.name}'s Parent!
              </h2>
              <p className="text-gray-600">
                Scan pet food labels to check if they're suitable for{" "}
                {petInfo?.name}.
              </p>
            </div>
            <Scanner onImageCapture={handleImageCapture} />
            {isAnalyzing && (
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    <span className="ml-3">Analyzing nutritional information...</span>
                  </div>
                </CardContent>
              </Card>
            )}
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle>Nutritional Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-left">
                    {analysis}
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;