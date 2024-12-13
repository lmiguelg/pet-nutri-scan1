import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const commonAllergies = [
  "Beef", "Dairy", "Chicken", "Wheat", "Soy",
  "Corn", "Egg", "Fish", "Lamb", "Pork"
];

const commonHealthIssues = [
  "Obesity", "Dental Disease", "Arthritis", "Diabetes",
  "Heart Disease", "Kidney Disease", "Liver Disease",
  "Allergies", "Skin Problems", "Cancer"
];

interface PetInfo {
  name: string;
  gender: string;
  age: number;
  weight: number;
  allergies: string[];
  healthIssues: string[];
}

interface OnboardingFormProps {
  onComplete: (petInfo: PetInfo) => void;
}

export const OnboardingForm = ({ onComplete }: OnboardingFormProps) => {
  const [step, setStep] = useState(1);
  const [petInfo, setPetInfo] = useState<PetInfo>({
    name: "",
    gender: "",
    age: 0,
    weight: 0,
    allergies: [],
    healthIssues: [],
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 1 && (!petInfo.name || !petInfo.gender)) {
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
                s <= step ? "bg-primary-500" : "bg-gray-200"
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

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Pet's Name *</Label>
            <Input
              id="name"
              value={petInfo.name}
              onChange={(e) =>
                setPetInfo({ ...petInfo, name: e.target.value })
              }
              placeholder="Enter pet's name"
            />
          </div>
          <div className="space-y-2">
            <Label>Gender *</Label>
            <RadioGroup
              value={petInfo.gender}
              onValueChange={(value) =>
                setPetInfo({ ...petInfo, gender: value })
              }
            >
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="age">Age (years) *</Label>
            <Input
              id="age"
              type="number"
              value={petInfo.age || ""}
              onChange={(e) =>
                setPetInfo({ ...petInfo, age: Number(e.target.value) })
              }
              placeholder="Enter age"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg) *</Label>
            <Input
              id="weight"
              type="number"
              value={petInfo.weight || ""}
              onChange={(e) =>
                setPetInfo({ ...petInfo, weight: Number(e.target.value) })
              }
              placeholder="Enter weight"
            />
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label>Common Allergies</Label>
            <div className="grid grid-cols-2 gap-2">
              {commonAllergies.map((allergy) => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox
                    id={allergy}
                    checked={petInfo.allergies.includes(allergy)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPetInfo({
                          ...petInfo,
                          allergies: [...petInfo.allergies, allergy],
                        });
                      } else {
                        setPetInfo({
                          ...petInfo,
                          allergies: petInfo.allergies.filter(
                            (a) => a !== allergy
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor={allergy}>{allergy}</Label>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Health Issues</Label>
            <div className="grid grid-cols-2 gap-2">
              {commonHealthIssues.map((issue) => (
                <div key={issue} className="flex items-center space-x-2">
                  <Checkbox
                    id={issue}
                    checked={petInfo.healthIssues.includes(issue)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setPetInfo({
                          ...petInfo,
                          healthIssues: [...petInfo.healthIssues, issue],
                        });
                      } else {
                        setPetInfo({
                          ...petInfo,
                          healthIssues: petInfo.healthIssues.filter(
                            (i) => i !== issue
                          ),
                        });
                      }
                    }}
                  />
                  <Label htmlFor={issue}>{issue}</Label>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

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