export interface RecipeType {
    id: number;
    _id:number;
    title: string;
    image: string;
    instructions: string;
    analyzedInstructions: Instruction[];
    extendedIngredients: Ingredient[];
  }

export interface FavoriteRecipeType {
    id: number;
    _id:number;
    title: string;
    image: string;
    instructions: string;
    analyzedInstructions: Instruction[];
    extendedIngredients: Ingredient[];
  }
export interface Ingredient {
  original: string;
} 
export interface Step {
    number: number;
    step: string;
}

export interface Instruction {
    name: string;
    steps: Step[];
}

 
  export interface HomePageProps {
    recipes: RecipeType[];
    recipesThatAreLiked: RecipeType[]; 
  }
  