export interface Step {
    number: number;
    step: string;
  }
  
  export interface Instruction {
    steps: Step[];
  }
  
  export interface RecipeType {
    id: number;
    _id:number;
    title: string;
    image: string;
    instructions: string;
    analyzedInstructions: Instruction[];
  }
  
  export interface FavoriteRecipeType {
    _id: number;
    title: string;
    image: string;
    instructions: string;  
    analyzedInstructions: Instruction[];
}