export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Recipe = {
  id: string;
  userId: string;
  name: string;
  mealType: string;
  cuisine: string;
  prepTime: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  sourceUrl: string;
  sourcePlatform: 'tiktok' | 'instagram' | 'youtube';
  createdAt: Date;
  updatedAt: Date;
};

export type Ingredient = {
  id: string;
  recipeId: string;
  name: string;
  quantity: string;
  unit?: string;
  createdAt: Date;
};

export type RecipeStep = {
  id: string;
  recipeId: string;
  stepNumber: number;
  description: string;
  createdAt: Date;
}; 