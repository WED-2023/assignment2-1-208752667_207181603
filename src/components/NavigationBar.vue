<template>
    <div id="nav">
      <router-link :to="{ name: 'main' }">Home</router-link>
      <router-link :to="{ name: 'search' }">Search</router-link>
      <router-link :to="{ name: 'About' }">About</router-link>
      <span class="dropdown" v-if="!$root.store.username">
        <button class="dropdown_button">Hello Guest</button>
        <div class="dropdown_content">
          <router-link :to="{ name: 'register' }">Register</router-link>
          <router-link :to="{ name: 'login' }">Login</router-link>
        </div>
      </span>
      <span class="dropdown" v-else>
        <button class="dropdown_button">Hello {{ $root.store.username }}</button>
        <div class="dropdown_content">
          <button id="logout_button" @click="Logout">Logout</button>
          <router-link :to="{ name: 'MyFavoriteRecipes' }">Favorites</router-link>
          <router-link :to="{ name: 'MyRecipes' }">My Recipes</router-link>
          <router-link :to="{ name: 'MyFamilyRecipes' }">Family Recipes</router-link>
        </div>
      </span>
    </div>
</template>

<script>
export default {
  name: "NavigationBar",
  methods: {
    Logout() {
      this.$root.store.logout();
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    }
  }
};
</script>

<style scoped>

#nav {
  background-color: rgb(183, 222, 228);
	position: fixed;
	width: 100%;
	height: 50px;
	display: flex;
	font-weight: bold;
  align-items: center;
	border-radius: 0px 0px 5px 5px;
  justify-content: space-around;
}

a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

/* Style The Dropdown Button */
.dropdown_button {
  font-weight: bold;
  background-color: rgb(138, 221, 233);
  padding: 16px;
	border-radius: 0px 0px 5px 5px;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown_content {
  display: none;
  position: absolute;
  background-color: rgb(183, 222, 228);
  min-width: 100%;
  border-radius: 5px 5px 5px 5px;
}

/* Links inside the dropdown */
.dropdown_content a {
  padding-left: 16px;
  padding-top: 5px;
  display: block;
}

#logout_button {
  border: none;
  display: block;
  background-color: transparent;
  font-weight: bold;
  text-align: center;
  padding-left: 16px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

#logout_button:hover {
  color: white;
  text-decoration: underline;
}
.dropdown_content a:hover {color: white;}
.dropdown:hover .dropdown_content {display: block;}
</style>