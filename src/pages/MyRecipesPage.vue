<template>
  <div>
      <h1 style="padding-top: 100px;">My Recipes</h1>
      <RecipePreviewList :recipes="myRecipes" style="margin-top: 9.3%;"/>
  </div>
</template>

<script>

import RecipePreviewList from "../components/RecipePreviewList";
import { mockGetMyRecipes } from "../services/recipes.js";

export default {
    name: "MyRecipesPage",
    components: {
      RecipePreviewList
    },
    data() {
        return {
          myRecipes: []
        };
    },
    mounted() {
        this.getMyRecipes();
    },
    methods: {
        async getMyRecipes() {
            let recipesList = [];
            try {

            // Replace the mock
            const response = mockGetMyRecipes(3);
            recipesList = response.data.recipes;
            } catch (error) {
                console.log(error);
            }
            this.myRecipes = [];
            this.myRecipes.push(...recipesList);
        }
    }
};
</script>