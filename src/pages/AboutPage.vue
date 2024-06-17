<template>
  <div class="container">
    <h1 class="title">About Page</h1>
  </div>
</template>

<script>
import { mockGetRecipeFullDetails } from "../services/recipes.js";
import RecipePreview from "../components/RecipePreview.vue";

export default {
  components: {
    RecipePreview
  },
  data() {
    return {
      recipe: null
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