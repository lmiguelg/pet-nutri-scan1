import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { PetInfo } from "@/types/pet";

interface PetSelectorProps {
  pets: PetInfo[];
  selectedPetId: string | null;
  onPetSelect: (petId: string) => void;
}

export const PetSelector = ({ pets, selectedPetId, onPetSelect }: PetSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Select Pet</label>
      <Select value={selectedPetId || undefined} onValueChange={onPetSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Choose a pet" />
        </SelectTrigger>
        <SelectContent>
          {pets.map((pet) => (
            <SelectItem key={pet.id} value={pet.id}>
              {pet.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};