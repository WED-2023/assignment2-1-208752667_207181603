<template>
  <div>
      <h1 style="padding-top: 100px;">Favorites</h1>
      <RecipePreviewList :recipes="favoriteRecipes" style="margin-top: 9.3%;"/>
  </div>
</template>

<script>

import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetFavoritesRecipes } from "../services/recipes.js";

export default {
    name: "MyFavoriteRecipesPage",
    components: {
      RecipePreviewList
    },
    data() {
        return {
          favoriteRecipes: []
        };
    },
    mounted() {
        this.getFavoriteRecipes();
    },
    methods: {
        async getFavoriteRecipes() {
            let recipesList = [];
            try {

            // Replace the mock
            const response = mockGetFavoritesRecipes(3);
            recipesList = response.data.recipes;
            } catch (error) {
                console.log(error);
            }
            this.favoriteRecipes = [];
            this.favoriteRecipes.push(...recipesList);
        }
    }
};
</script>