<template>
  <div class="recipe-preview">
    <b-card style="min-width: 25rem;" class="mb-2">
      <router-link :to="{ name: 'recipe', params: { id: recipe.id } }" class="recipe-link">
        <b-card-img :src="recipe.image" img-alt="Card image" class="squared-image" img-top style="height: 300px; "></b-card-img>
        <b-card-title>{{ recipe.title }} </b-card-title>
      </router-link>
      <b-button v-if="$root.store.username" :pressed="inFavorites" variant="outline-warning" class="mb-2"  @click.prevent="favoritesAction">
        <b-icon v-if="inFavorites" icon="star-fill" aria-hidden="true" class=""></b-icon>
        <b-icon v-else icon="star" aria-hidden="true" class=""></b-icon>
        Add to Favorites
      </b-button>
      <b-card-sub-title style="height: 50px;">{{ summaryTrimmed }}</b-card-sub-title>
      <template #footer>
        <small class="text-muted">Cook time: {{ recipe.readyInMinutes }} mins | {{ recipe.aggregateLikes }} </small>
        <img src="../assets/like.png" width="15px" alt="like">
        <small class="text-muted"> | </small> 
        <img src="../assets/gluten-free-icon.png" width="20px" alt="gluten free" v-if="recipe.glutenFree"> 
        <img src="../assets/vegan-icon.png" width="20px" alt="vegen" v-if="recipe.vegan"> 
        <img src="../assets/vegetarian-icon.png" width="20px" alt="vegetarian" v-if="recipe.vegetarian">
      </template>
    </b-card>
  </div>
</template>  

<script>

export default {
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  mounted() {
      this.isInFavorites();
  },
  data() {
    return {
      summaryTrimmed : this.recipe.summary.substring(0, 90) + "...",
      inFavorites: false
    };
  },
  
  methods: {
    async isInFavorites() {
      if(!this.$root.store.username){
        return;
      }
      try {
          const response = await this.axios.get(
          this.$root.store.server_domain + "/users/favorites/" + this.recipe.id);
          if(response.data) {
            this.inFavorites = true;
          }
      } catch (error) {
          console.log(error);
      }
    },
    async favoritesAction() {
      // Add or remove from favorites based on current state
      let success;
      let message;
      
      try{
        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/favorites",
          {
            id: this.recipe.id
          }
        );
        success = response.data.success;
        message = response.data.message;
      }
      catch(err){
        message = err.response.data.message;
        success = false;
      }

      if(success){
        this.inFavorites = !this.inFavorites;
        this.recipe.aggregateLikes += this.inFavorites ? 1 : -1;
      }
      
      this.$root.toast(this.recipe.title, message, success);
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
