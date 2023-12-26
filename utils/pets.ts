import { PET_BREEDS, PET_TYPES } from "./constants";

export const getPetBreed = (breed: string) =>
  PET_BREEDS.find((b) => b.value === breed);

export const getPetType = (type: string) =>
  PET_TYPES.find((t) => t.value === type);
