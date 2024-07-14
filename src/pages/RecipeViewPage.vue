<template>
  <div class="container">
    <b-card v-if="recipe" style="margin-top: 20px;">
      <h1>{{ recipe.title }}</h1>
      <b-card-img :src="recipe.image" img-alt="Card image" class="squared-image" img-top></b-card-img>
      <h2>{{ recipe.summary }}</h2>
      <h3>
        <small class="text-muted">{{ recipe.readyInMinutes }} mins to cook | {{ recipe.aggregateLikes }} people likes | For {{ recipe.servings }} dishes</small>
        <small v-if="recipe.glutenFree" class="text-muted"> | Gluten Free</small>
        <small v-if="recipe.vegetarian" class="text-muted"> | Vegetarian</small>
        <small v-if="recipe.vegan" class="text-muted"> | Vegan</small>
      </h3>
      <b-button v-if="$root.store.username" :pressed="inFavorites" variant="outline-warning" class="mb-2" @click.prevent="favoritesAction">
        <b-icon v-if="inFavorites" icon="star-fill" aria-hidden="true" class=""></b-icon>
        <b-icon v-else icon="star" aria-hidden="true" class=""></b-icon>
        Add to Favorites
      </b-button>
      <div class="Ingredients">
        <h2>Ingredients</h2>
        <ul>
          <li v-for="ingredient in recipe.extendedIngredients" :key="ingredient.name">
            {{ ingredient.amount }} {{ ingredient.unit }} of {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <div class="instructions">
        <h2>Instructions</h2>
        <ol>
          <li v-for="stepDetails in recipe.analyzedInstructions[0].steps" :key="stepDetails.step">
            {{ stepDetails.step }}
          </li>
        </ol>
      </div>
    </b-card>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
export default {
  name: "RecipeViewPage",
  data() {
    return {
      recipe: null,
      inFavorites: false
    };
  },
  async created() {
    await this.createRecipe();
    await this.isInFavorites();
  },
  methods: {
    async createRecipe() {
      try {
        const recipe_received = await this.axios.get(
          this.$root.store.server_domain + "/recipes/" + this.$route.params.id
        );
        if (recipe_received.data.success) {
          this.recipe = recipe_received.data.recipe;
        }
      } catch (error) {
        console.log(error);
        this.$root.toast("Loading Failed", "Failed to find the requested recipe in the database", false);
      }
    },
    async isInFavorites() {
      if (!this.$root.store.username) {
        return;
      }
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites/" + this.recipe.id
        );
        if (response.data) {
          this.inFavorites = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async favoritesAction() {
      // Add or remove from favorites based on current state
      let success;
      let message;

      try {
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            id: this.recipe.id
          }
        );
        success = response.data.success;
        message = response.data.message;
      } catch (err) {
        message = err.response.data.message;
        success = false;
      }

      if (success) {
        this.inFavorites = !this.inFavorites;
        this.recipe.aggregateLikes += this.inFavorites ? 1 : -1;
      }

      this.$root.toast(this.recipe.title, message, success);
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
