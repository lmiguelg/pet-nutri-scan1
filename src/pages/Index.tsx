import { useState } from "react";
import { OnboardingForm } from "@/components/OnboardingForm";
import { Scanner } from "@/components/Scanner";
import { motion } from "framer-motion";

interface PetInfo {
  name: string;
  gender: string;
  age: number;
  weight: number;
  allergies: string[];
  healthIssues: string[];
}

const Index = () => {
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  const handleOnboardingComplete = (info: PetInfo) => {
    setPetInfo(info);
    setIsOnboarded(true);
  };

  const handleImageCapture = (image: File) => {
    // TODO: Implement image analysis with OpenAI
    console.log("Image captured:", image);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-100 to-primary-200 py-8 px-4">
      <div className="max-w-md mx-auto">
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