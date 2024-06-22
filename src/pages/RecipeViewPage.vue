<template>
  <div class="container">
    <b-card style="margin-top: 20px;">
      <h1>{{ recipe.title }}</h1>
      <b-card-img :src="recipe.image" img-alt="Card image" class="squared-image" img-top></b-card-img>
      <h2>{{ recipe.summary }}</h2>
      <h3>
          <small class="text-muted">{{ recipe.readyInMinutes }} mins to cook | {{ recipe.aggregateLikes }} people likes | For {{ recipe.servings }} dishes</small>
          <small v-if="recipe.glutenFree" class="text-muted"> | Gluten Free</small>
          <small v-if="recipe.vegetarian" class="text-muted"> | Vegetarian</small>
          <small v-if="recipe.vegan" class="text-muted"> | Vegan</small>
      </h3>
      <b-button v-if="$root.store.username" :pressed.sync="inFavorites" variant="outline-warning" class="mb-2"  @click="favoritesAction">
        <b-icon v-if="inFavorites" icon="star-fill" aria-hidden="true" class=""></b-icon>
        <b-icon v-else icon="star" aria-hidden="true" class=""></b-icon>
        Add to Favorites
      </b-button>
      <div class="ingiridients">
        <h2>Ingredients</h2>
        <ul>
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
            {{ ingredient.quantity }} {{ ingredient.unit }} of {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <div class="instructions">
        <h2>Instructions</h2>
        <ol>
          <li v-for="step in recipe.instructions" :key="step">
            {{ step }}
          </li>
        </ol>
      </div>
    </b-card>
  </div>
</template>

<script>
import { mockAddFavorite, mockRemoveFavorite, mockIsInFavoites } from '../services/user';
import { mockGetRecipeFullDetails } from '../services/recipes';

export default {
  data() {
    return {
      recipe: null,
      // Replace the mocks
      inFavorites: mockIsInFavoites(this.$route.params.id).response.data.inFavorites
    };
  },
  async created() {
    let responseReceived;
    try{
      // recipe_received = await this.axios.get(
      //   this.$root.store.server_domain + "/recipes/" + this.$route.params.recipeId,
      //   {
      //     withCredentials: true
      //   }
      // );
      responseReceived = mockGetRecipeFullDetails(this.$route.params.id);
    }
    catch (error) {
      console.log(error);
      this.$router.replace("/NotFound");
      return;
    }
    if (responseReceived.status !== 200){
      console.log(responseReceived.status)
      this.$router.replace("/NotFound");
      return;
    }
    this.recipe = responseReceived.respose.data.recipe;
  },
  favoritesAction() {
      // Add or remove from favorites based on current state
      let response;
      if (this.inFavorites) {
        // Replace the mock
        response = mockRemoveFavorite(this.recipe.id);
      } else {
        // Replace the mock
        response = mockAddFavorite(this.recipe.id);
      }
      this.$root.toast(this.recipe.title, response.response.data.message, response.response.data.success);
      if(response.response.data.status === 'success')
      {
        this.inFavorites = !this.inFavorites;
      }
    }
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
</style>