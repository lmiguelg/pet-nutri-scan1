import { useState } from "react";
import { OnboardingForm } from "@/components/OnboardingForm";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import type { PetInfo } from "@/types/pet";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { PetSelector } from "@/components/PetSelector";
import { PetFoodAnalyzer } from "@/components/PetFoodAnalyzer";

const Index = () => {
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      return user;
    },
  });

  const { data: pets = [], isLoading: isPetsLoading } = useQuery({
    queryKey: ['pets', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('pets')
        .select(`
          *,
          breeds (
            name
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      return data.map(pet => ({
        id: pet.id,
        name: pet.name,
        petType: pet.pet_type,
        breedId: pet.breed_id,
        gender: pet.gender,
        age: pet.age,
        weight: pet.weight,
        allergies: pet.allergies || [],
        healthIssues: pet.health_issues || [],
      })) as PetInfo[];
    },
    enabled: !!user,
  });

  const selectedPet = pets.find(pet => pet.id === selectedPetId);

  const handleOnboardingComplete = async (info: Omit<PetInfo, 'id'>) => {
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

  if (isPetsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-200 py-8 px-4 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-200 py-8 px-4">
      <div className="max-w-3xl mx-auto relative">
        <Button
          variant="outline"
          className="absolute right-0 top-0 bg-white/90 hover:bg-white/75 text-primary-700 border-primary-200 hover:border-primary-300 shadow-sm transition-all duration-200 font-medium"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
        {pets.length === 0 ? (
          <OnboardingForm onComplete={handleOnboardingComplete} />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome!
              </h2>
              <PetSelector
                pets={pets}
                selectedPetId={selectedPetId}
                onPetSelect={setSelectedPetId}
              />
              {selectedPet && (
                <p className="text-gray-600">
                  Scan pet food labels to check if they're suitable for {selectedPet.name}.
                </p>
              )}
            </div>
            {selectedPet && <PetFoodAnalyzer selectedPet={selectedPet} />}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;