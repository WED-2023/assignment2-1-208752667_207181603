<template>
  <div class="container">
      <h1 class="title">My Recipes</h1>
      <RecipePreviewList :recipes="myRecipes" style="margin-top: 9.3%;"/>
  </div>
</template>

<script>

import RecipePreviewList from "../components/RecipePreviewList";

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
            try {
                const response = await this.axios.get(
                this.$root.store.server_domain + "/users/recipes");
                this.myRecipes = response.data;
            } catch (error) {
                this.$root.toast("Getting user recipes failed", error.response.data.message, false);
            }
        }
    }
};
</script>