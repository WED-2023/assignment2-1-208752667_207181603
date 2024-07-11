<template>
  <div class="container">
    <h1 class="title">Grammy's Goodies</h1>
    <b-row v-if="!$root.store.username">
      <b-col>
        <b-card>
          <div class="random-recipes">
            <RandomRecipes :rowSizeComponent="true"/>
          </div>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="user-specific-card">
          <LoginWindow/>
        </b-card>
      </b-col>
    </b-row>
    <RandomRecipes v-else/>
  </div>
</template>

<script>
import RandomRecipes from "../components/RandomRecipes";
import LastViewedRecipes from "../components/LastViewedRecipes";
import LoginWindow from "../components/LoginWindow";
export default {
  name: "MainPage",
  components: {
    RandomRecipes,
    LoginWindow,
    LastViewedRecipes
  }
};
</script>

<style lang="scss" scoped>
.user-specifc-card {
  height: 530px;
  width: 550px;
}
</style>