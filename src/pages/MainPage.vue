<template>
  <div class="container">
    <h1 class="title">Grammy's Goodies</h1>
    <b-row>
      <b-col>
        <b-card>
          <div class="random-recipes">
            <RandomRecipes />
          </div>
        </b-card>
      </b-col>
      <b-col>
        <b-card class="user-specific-card">
          <LoginWindow v-if="!$root.store.username"/>
          <LastViewedRecipes v-else/>
        </b-card>
      </b-col>
    </b-row>
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