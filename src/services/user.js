export function mockAddFavorite(recipeId) {
  return { status: 200, response: { data: { message: "The Recipe successfully saved as favorite", success: true}} };
}
export function mockRemoveFavorite(recipeId) {
  return { status: 200, response: { data: { message: "The Recipe successfully removed from favorites", success: true}} };
}

export function mockAddUserRecipe(recipeDetails) {
  return { status: 200, response: { data: { message: "The Recipe successfully added to My Recipes", success: true}} };
}

export function mockIsInFavoites(recipeId) {
  return { status: 200, response: { data: { inFavorites: recipeId % 2 === 0}} };
}

export function mockviewedRecipe(recipeId) {
  return { status: 200, response: { data: { seen: recipeId % 2 === 0}} };
}

  