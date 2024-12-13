import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PetInfo, Breed, PetType } from "@/types/pet";

interface BasicInfoStepProps {
  petInfo: PetInfo;
  updatePetInfo: (updates: Partial<PetInfo>) => void;
}

export const BasicInfoStep = ({ petInfo, updatePetInfo }: BasicInfoStepProps) => {
  const { data: breeds } = useQuery({
    queryKey: ['breeds', petInfo.petType],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('breeds')
        .select('*')
        .eq('pet_type', petInfo.petType);
      
      if (error) throw error;
      return data as Breed[];
    },
    enabled: !!petInfo.petType,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Pet's Name *</Label>
        <Input
          id="name"
          value={petInfo.name}
          onChange={(e) => updatePetInfo({ name: e.target.value })}
          placeholder="Enter pet's name"
        />
      </div>

      <div className="space-y-2">
        <Label>Pet Type *</Label>
        <RadioGroup
          value={petInfo.petType}
          onValueChange={(value: PetType) => {
            updatePetInfo({ petType: value, breedId: null });
          }}
        >
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dog" id="dog" />
              <Label htmlFor="dog">Dog</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="cat" id="cat" />
              <Label htmlFor="cat">Cat</Label>
            </div>
          </div>
        </RadioGroup>
      </div>

      {petInfo.petType && breeds && (
        <div className="space-y-2">
          <Label>Breed *</Label>
          <Select
            value={petInfo.breedId?.toString()}
            onValueChange={(value) => updatePetInfo({ breedId: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a breed" />
            </SelectTrigger>
            <SelectContent>
              {breeds.map((breed) => (
                <SelectItem key={breed.id} value={breed.id.toString()}>
                  {breed.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label>Gender *</Label>
        <RadioGroup
          value={petInfo.gender}
          onValueChange={(value) => updatePetInfo({ gender: value })}
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
    </div>
  );
};