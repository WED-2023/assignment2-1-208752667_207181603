<template>
    <div class="container">
      <h1 class="title">Create Recipe Page</h1>
      <NewRecipeModal />
    </div>
  </template>


<script>
import NewRecipeModal from "../components/NewRecipeModal.vue";
export default {
  components: {
    NewRecipeModal
  }
};
</script>