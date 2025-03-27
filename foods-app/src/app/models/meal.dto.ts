import { IngredientResponseDTO } from './ingredient.dto';

export interface MealCreateDTO {
  name: string;
  ingredientIds: number[];
}

export interface MealUpdateDTO extends MealCreateDTO {
  id: number;
}

export interface MealResponseDTO {
  id: number;
  name: string;
  ingredients: IngredientResponseDTO[];
}