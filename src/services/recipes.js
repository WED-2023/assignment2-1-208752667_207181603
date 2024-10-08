import example_recipes from "../assets/mocks/example_recipes.json";
import family_recipes from "../assets/mocks/family_recipes.json";

function shuffle(array) {
  let currentIndex = array.length;
  
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export function mockGetRandomRecipes(amount) {
  let recipes = JSON.stringify(example_recipes);
  recipes = JSON.parse(recipes);
  
  shuffle(recipes);
  recipes = recipes.slice(0, amount);

  return { data: { recipes: recipes } };
}

export function mockGetSearchResults(query, limit, intolerances=[], diets=[], cuisines=[]){
  let recipes = example_recipes;
  shuffle(recipes)
  recipes = recipes.slice(0, limit);
  if(query === "empty"){
    recipes = [];
  }
  return { data: { recipes: recipes } };
}

export function mockGetLastViewedRecipes(count) {
  let recipes = example_recipes;
  recipes = recipes.slice(0, count);

  return { data: { recipes: recipes } };
}

export function mockGetFavoritesRecipes(count) {
  let recipes = example_recipes;
  recipes = [recipes[1], recipes[3], recipes[5]];

  return { data: { recipes: recipes } };
} 

export function mockGetMyRecipes(count) {
  let recipes = example_recipes;
  recipes = recipes.slice(3, count + 3);

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(id) {
  id = Number(id);
  let recipe = example_recipes.find(example_recipe => example_recipe.id === id);
  if (!recipe) {
    recipe = family_recipes.find(family_recipe => family_recipe.id === id);
  }
  return { status: 200, response: {data: { recipe: recipe } }};
}

export function mockGetFamilyRecipes() {
  let recipes = JSON.stringify(family_recipes);
  recipes = JSON.parse(recipes);
  return { data: { recipes: recipes } };
}