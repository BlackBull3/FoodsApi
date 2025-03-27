import { MealResponseDTO } from './meal.dto';

export interface OrderCreateDTO {
  mealId: number;
}

export interface OrderResponseDTO {
  id: number;
  meal: MealResponseDTO;
  status: string;
  createdAt: Date;
}

export interface UpdateStatusDTO {
  status: string;
}