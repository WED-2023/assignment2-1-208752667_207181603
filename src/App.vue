<template>
  <div id="app">
    <NavigationBar />
    <router-view />
    <b-modal id="create-recipe-modal" title="Create New Recipe">
      <p class="my-4">
        Recipe Content
      </p>
    </b-modal>
  </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar";
export default {
  components: {
    NavigationBar
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

</style>