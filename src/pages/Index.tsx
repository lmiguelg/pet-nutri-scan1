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

const Index = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
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

  const handleImageCapture = (image: File) => {
    // TODO: Implement image analysis with OpenAI
    console.log("Image captured:", image);
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
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;