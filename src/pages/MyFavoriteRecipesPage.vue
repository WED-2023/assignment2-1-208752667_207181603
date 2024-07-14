<template>
  <div class="container">
      <h1 class="title">Favorites</h1>
      <RecipePreviewList :recipes="favoriteRecipes" style="margin-top: 9.3%;"/>
  </div>
</template>

<script>

import RecipePreviewList from "../components/RecipePreviewList";

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
            try {
                const response = await this.axios.get(
                this.$root.store.server_domain + "/users/favorites/all");
                this.favoriteRecipes = response.data;
            } catch (error) {
                this.$root.toast("Getting user favorite recipes failed", error.response.data.message, false);
            }
        }
    }
};
</script>