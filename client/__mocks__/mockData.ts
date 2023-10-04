import { RecipeType } from "../src/@types/recipe";

export const mockRandomRecipes: RecipeType[] = [
    {
        _id: 1234567,
        id: 1234567890,
        title: 'Mock Recipe Title',
        image: 'https://path/to/mock/image.jpg',
        // extendedIngredients: [
        //     { original: '1 cup of mock ingredient 1' },
        //     { original: '2 spoons of mock ingredient 2' },
        // ],
        instructions: 'cook dat shizz',
        analyzedInstructions: [
            {
                steps: [
                    { number: 1, step: 'Mock instruction step 1' },
                    { number: 2, step: 'Mock instruction step 2' },
                ],
            },
        ],
    }
];
  
 // "axios": "axios/dist/node/axios.cjs",