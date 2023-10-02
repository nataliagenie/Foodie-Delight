export interface Step {
    number: number;
    step: string;
  }
  
  export interface Instruction {
    steps: Step[];
  }
  
  export interface RecipeType {
    id: string;
    _id:string;
    title: string;
    image: string;
    instructions: string;
    analyzedInstructions: Instruction[];
  }
  
  export interface FavoriteRecipeType {
    _id: string;
    title: string;
    image: string;
    instructions: string;  
    analyzedInstructions: Instruction[];
}