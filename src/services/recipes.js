import example_recipes from "../assets/mocks/example_recipes.json";

function shuffle(array) {
  let currentIndex = array.length;
  
  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export function mockGetRandomRecipes(amount=1) {
  let recipes = example_recipes;
  shuffle(recipes)
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
  shuffle(recipes)
  recipes = recipes.slice(0, count);

  return { data: { recipes: recipes } };
}

export function mockGetRecipeFullDetails(id) {
  let recipe = example_recipes.find((r) => r.id === id);
  return { status: 200, respose: {data: { recipe: recipe } }};
}