export type PetType = 'dog' | 'cat';

export interface PetInfo {
  name: string;
  petType: PetType;
  breedId: number | null;
  gender: string;
  age: number;
  weight: number;
  allergies: string[];
  healthIssues: string[];
}

export interface Breed {
  id: number;
  name: string;
  pet_type: PetType;
}