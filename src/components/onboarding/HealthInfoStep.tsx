import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { PetInfo } from "@/types/pet";

const commonAllergies = [
  "Beef", "Dairy", "Chicken", "Wheat", "Soy",
  "Corn", "Egg", "Fish", "Lamb", "Pork"
];

const commonHealthIssues = [
  "Obesity", "Dental Disease", "Arthritis", "Diabetes",
  "Heart Disease", "Kidney Disease", "Liver Disease",
  "Allergies", "Skin Problems", "Cancer"
];

interface HealthInfoStepProps {
  petInfo: PetInfo;
  updatePetInfo: (updates: Partial<PetInfo>) => void;
}

export const HealthInfoStep = ({ petInfo, updatePetInfo }: HealthInfoStepProps) => {
  return (
    <div className="space-y-4">
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
                    updatePetInfo({
                      allergies: [...petInfo.allergies, allergy],
                    });
                  } else {
                    updatePetInfo({
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
                    updatePetInfo({
                      healthIssues: [...petInfo.healthIssues, issue],
                    });
                  } else {
                    updatePetInfo({
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
    </div>
  );
};