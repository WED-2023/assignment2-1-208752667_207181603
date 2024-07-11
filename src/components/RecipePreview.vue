<template>
  <div class="recipe-preview">
    <b-card style="min-width: 25rem;" class="mb-2">
      <router-link :to="{ name: 'recipe', params: { id: recipe.id } }" class="recipe-link">
        <b-card-img :src="recipe.image" img-alt="Card image" class="squared-image" img-top style="height: 300px; "></b-card-img>
        <b-card-title>{{ recipe.title }} </b-card-title>
      </router-link>
      <b-button v-if="$root.store.username" :pressed.sync="inFavorites" variant="outline-warning" class="mb-2"  @click="favoritesAction">
        <b-icon v-if="inFavorites" icon="star-fill" aria-hidden="true" class=""></b-icon>
        <b-icon v-else icon="star" aria-hidden="true" class=""></b-icon>
        Add to Favorites
      </b-button>
      <b-card-sub-title style="height: 50px;">{{ summaryTrimmed }}</b-card-sub-title>
      <template #footer>
        <small class="text-muted">Cook time: {{ recipe.readyInMinutes }} mins | {{ recipe.aggregateLikes }} </small>
        <img src="../assets/like.png" width="15px" alt="like">
        <small class="text-muted"> | </small> 
        <img src="../assets/gluten-free-icon.png" width="20px" alt="gluten" v-if="recipe.glutenFree" title="Gluten Free"> 
        <img src="https://clipground.com/images/vegan-png-7.png" width="20px" alt="vegen" v-if="recipe.vegan" title="Vegan"> 
        <img src="https://cdn1.iconfinder.com/data/icons/flat-green-organic-natural-badges/500/Vegetarian-2-512.png" width="20px" alt="vegetarian" v-if="recipe.vegetarian" title="Vegetarian">
      </template>
    </b-card>
  </div>
</template>  

<script>
import { mockAddFavorite, mockRemoveFavorite, mockIsInFavoites } from '../services/user';

export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      summaryTrimmed : this.recipe.summary.substring(0, 90) + "...",
      // Replace the mocks
      inFavorites: mockIsInFavoites(this.recipe.id).response.data.inFavorites
    };
  },
  
  methods: {
    favoritesAction() {
      // Add or remove from favorites based on current state
      this.inFavorites = !this.inFavorites;
      let response;
      if (this.inFavorites == true) {
        // Replace the mock
        response = mockRemoveFavorite(this.recipe.id);
      } else {
        // Replace the mock
        response = mockAddFavorite(this.recipe.id);
      }
      this.$root.toast(this.recipe.title, response.response.data.message, response.response.data.success);
      if(!response.response.data.status)
      {
        this.inFavorites = !this.inFavorites;
      }
    }
  }
};
</script>

<style scoped>

.recipe-link {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}

.recipe-link .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-link .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-link .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-link .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
