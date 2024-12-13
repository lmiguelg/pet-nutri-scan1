import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { BasicInfoStep } from "./onboarding/BasicInfoStep";
import { PhysicalDetailsStep } from "./onboarding/PhysicalDetailsStep";
import { HealthInfoStep } from "./onboarding/HealthInfoStep";
import type { PetInfo } from "@/types/pet";

interface OnboardingFormProps {
  onComplete: (petInfo: PetInfo) => void;
}

export const OnboardingForm = ({ onComplete }: OnboardingFormProps) => {
  const [step, setStep] = useState(1);
  const [petInfo, setPetInfo] = useState<PetInfo>({
    name: "",
    petType: "dog",
    breedId: null,
    gender: "",
    age: 0,
    weight: 0,
    allergies: [],
    healthIssues: [],
  });
  const { toast } = useToast();

  const updatePetInfo = (updates: Partial<PetInfo>) => {
    setPetInfo((current) => ({ ...current, ...updates }));
  };

  const handleNext = () => {
    if (step === 1 && (!petInfo.name || !petInfo.gender || !petInfo.breedId)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    if (step === 2 && (!petInfo.age || !petInfo.weight)) {
      toast({
        title: "Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete(petInfo);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 w-full mx-1 rounded ${
                s <= step ? "bg-primary" : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {step === 1
            ? "Basic Information"
            : step === 2
            ? "Physical Details"
            : "Health Information"}
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {step === 1 && (
          <BasicInfoStep petInfo={petInfo} updatePetInfo={updatePetInfo} />
        )}
        {step === 2 && (
          <PhysicalDetailsStep petInfo={petInfo} updatePetInfo={updatePetInfo} />
        )}
        {step === 3 && (
          <HealthInfoStep petInfo={petInfo} updatePetInfo={updatePetInfo} />
        )}
      </motion.div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === 1}
        >
          Back
        </Button>
        <Button onClick={handleNext}>
          {step === 3 ? "Complete" : "Next"}
        </Button>
      </div>
    </motion.div>
  );
};