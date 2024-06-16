<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="warning" style="position: fixed; width: 100%; z-index: 10;">
      <b-navbar-brand :to="{ name: 'main' }" id="brand_icon">
        <img src="../assets/logo.png" width="40px" alt="Home">
      </b-navbar-brand>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{ name: 'Search' }">Search</b-nav-item>
          <b-nav-item v-b-modal.create-recipe-modal v-if="$root.store.username">Create New Recipe</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="$root.store.username">
          <template #button-content>
            <em>Hello {{ $root.store.username }}</em>
          </template>
          <b-dropdown-item variant="info" :to="{ name: 'MyFavoriteRecipes' }">Favorites</b-dropdown-item>
          <b-dropdown-item variant="info" :to="{ name: 'MyRecipes' }">My Recipes</b-dropdown-item>
          <b-dropdown-item variant="info" :to="{ name: 'MyFamilyRecipes' }">Family Recipes</b-dropdown-item>
          <b-dropdown-item variant="danger" @click="Logout" v-if="$root.store.username">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown v-else left>
          <template #button-content>
            <em>Hello Guest</em>
          </template>
          <b-dropdown-item :to="{ name: 'login' }">Login</b-dropdown-item>
          <b-dropdown-item :to="{ name: 'register' }">Register</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item :to="{ name: 'About' }" >About</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavigationBar",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
      this.$root.toast("Logout", "User logged out successfully", "success");
    }
  }
};
</script>

<style scoped>

em {
  color: #ffffff;
}

a {
  color: #ffffff;
}

/* style to active router-link */

a.router-link-exact-active {
  font-weight: bold;
  color: #ffffff;
}
#brand_icon
{
  padding: 5px;
	height: 100%;
	transition: transform 1s;
}


#brand_icon:hover
{
	transform: rotate(360deg);
	transition: transform 1.5s;
}

</style>
