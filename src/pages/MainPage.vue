<template>
  <div class="container">
    <h1 class="title">Grammy's Goodies</h1>
    <b-row>
      <b-col>
        <b-card>
          <div class="random-recipes">
        <h2>Random Recipes</h2>
        <b-button variant="outline-warning" @click="updateRandomRecipes">Load New Recipes</b-button>
        <RecipePreviewList amountToFetch="3" ref="randomRecipes" />
      </div>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="user-specific-card">
          <LoginWindow v-if="!$root.store.username"/>
          <RecipePreviewList v-else amountToFetch="3" title="Last Viewed Recipes" />
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
import LoginWindow from "../components/LoginWindow";
export default {
  components: {
    RecipePreviewList,
    LoginWindow
  },
  methods: {
    updateRandomRecipes() {
      this.$refs.randomRecipes.updateRecipes();
    }
  }
};
</script>

<style lang="scss" scoped>
.random-recipes {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.user-specifc-card {
  height: 530px;
  width: 550px;
}
</style>