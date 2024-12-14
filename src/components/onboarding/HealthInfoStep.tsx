import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { PetInfo } from "@/types/pet";

interface HealthInfoStepProps {
  petInfo: Omit<PetInfo, 'id'>;
  updatePetInfo: (updates: Partial<Omit<PetInfo, 'id'>>) => void;
}

export const HealthInfoStep = ({ petInfo, updatePetInfo }: HealthInfoStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Allergies (optional)</Label>
        <Input
          placeholder="Enter allergies, separated by commas"
          value={petInfo.allergies.join(", ")}
          onChange={(e) => {
            const allergies = e.target.value
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== "");
            updatePetInfo({ allergies });
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Health Issues (optional)</Label>
        <Input
          placeholder="Enter health issues, separated by commas"
          value={petInfo.healthIssues.join(", ")}
          onChange={(e) => {
            const healthIssues = e.target.value
              .split(",")
              .map((item) => item.trim())
              .filter((item) => item !== "");
            updatePetInfo({ healthIssues });
          }}
        />
      </div>
    </div>
  );
};