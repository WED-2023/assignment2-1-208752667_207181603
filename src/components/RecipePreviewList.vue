<template>
  <b-container>
    <h3 v-if="title">
      {{ title }}:
    </h3>
    <b-row>
    <b-col v-for="r in recipes" :key="r.id" cols="12" md="6" lg="4">
      <RecipePreview class="recipePreview" :recipe="r" />
    </b-col>
  </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview
  },
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return "";
      }
    },
    recipes: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    itemsPerRow: {
      type: Number,
      required: false,
      default() {
        return 6;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
h3 {
  text-align: center;
}
</style>
