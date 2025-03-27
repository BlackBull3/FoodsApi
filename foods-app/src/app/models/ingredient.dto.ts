export interface IngredientCreateDTO {
    name: string;
    category: string;
  }
  
  export interface IngredientUpdateDTO extends IngredientCreateDTO {
    id: number;
  }
  
  export interface IngredientResponseDTO extends IngredientUpdateDTO {}