<template>
  <div id="app">
    <NavigationBar />
    <NewRecipeModal/>
    <router-view />
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
import NewRecipeModal from "./components/NewRecipeModal.vue";
export default {
  components: {
    NavigationBar,
    NewRecipeModal
  },
  name: "App",
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000000;
  background-color: white;
  min-height: 100vh;
}

.container{
	padding-top: 60px;
}

.toast:not(.show) {
   display: block !important;
}
</style>