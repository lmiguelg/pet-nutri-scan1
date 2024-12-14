import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { PetInfo } from "@/types/pet";

interface PhysicalDetailsStepProps {
  petInfo: Omit<PetInfo, 'id'>;
  updatePetInfo: (updates: Partial<Omit<PetInfo, 'id'>>) => void;
}

export const PhysicalDetailsStep = ({ petInfo, updatePetInfo }: PhysicalDetailsStepProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="age">Age (years) *</Label>
        <Input
          id="age"
          type="number"
          value={petInfo.age || ""}
          onChange={(e) => updatePetInfo({ age: Number(e.target.value) })}
          placeholder="Enter age"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="weight">Weight (kg) *</Label>
        <Input
          id="weight"
          type="number"
          value={petInfo.weight || ""}
          onChange={(e) => updatePetInfo({ weight: Number(e.target.value) })}
          placeholder="Enter weight"
        />
      </div>
    </div>
  );
};