<template>
  <div class="container">
    <h1 class="title">Search Recipes</h1>
    <div>
      <b-collapse id="advance-search-collapse">
        <b-card id="advance-search-card">
          <b-form id="form-cards">
            <MultipleChoiceFilter class="AdvanceSearcher" title="Intolerances" :choices="intolerancesChoices" @updateSelected="handleUpdateIntolerances"/>
            <MultipleChoiceFilter class="AdvanceSearcher" title="Diets" :choices="dietsChoices" @updateSelected="handleUpdateDiets"/>
            <MultipleChoiceFilter class="AdvanceSearcher" title="Cuisines" :choices="cuisinesChoices" @updateSelected="handleUpdateCuisines"/>
          </b-form>
        </b-card>
      </b-collapse>
  </div>
    <div class="search-bar">
      <input type="text" v-model="query" placeholder="Search Recipes..." id="search-query" name="search-query" autocomplete="off"/>
      <em>Requested Amount of Recipes: </em>
      <b-form-select v-model="limit" id="recipe-limit" name="recipe-limit">
        <b-form-select-option value="5">5</b-form-select-option>
        <b-form-select-option value="10">10</b-form-select-option>
        <b-form-select-option value="15">15</b-form-select-option>
      </b-form-select>
      <b-button pill v-b-toggle="'advance-search-collapse'" variant="info">Advance Search</b-button>
      <b-button pill @click="getSearchResults" variant="success">Search</b-button>
    </div>
    <div v-if = "results.length > 0" class="search-results">
      <b-form-group label="Sort by">
        <b-form-radio-group id="btn-radios-2" v-model="selected" :options="options" button-variant="outline-primary" buttons @change="sortRecipes"></b-form-radio-group>
      </b-form-group>
      <RecipePreviewList :title="'Search Results'" :recipes="results" :itemsPerRow="3"/>
    </div>
  </div>
</template>

<script>
import MultipleChoiceFilter from "../components/MultipleChoiceFilter";
import RecipePreviewList from "../components/RecipePreviewList";
import intolerances from "../assets/intolerances";
import diets from "../assets/diets";
import cuisines from "../assets/cuisines";

export default {
  components: {
    MultipleChoiceFilter,
    RecipePreviewList
  },
  data() {
    return {
      query: '',
      limit: 5,
      results: [],
      intolerancesChoices: intolerances,
      dietsChoices: diets,
      cuisinesChoices: cuisines,
      intolerancesSelected: [],
      dietsSelected: [],
      cuisinesSelected: [],
      selected: 0,
        options: [
          { text: 'Likes', value: 0 },
          { text: 'Cooking time', value: 1 }
        ]
    };
  },
  methods: {
    sortRecipes() {
      this.results.sort((a, b) => {
        return (1 - this.selected) * (b.aggregateLikes - a.aggregateLikes) + this.selected * (a.readyInMinutes - b.readyInMinutes);
      });
    },
    async getSearchResults() {
      let recipesList = [];
      try {
        const response = await this.axios.get(
          this.$root.store.server_domain + "/recipes/search", {
            params: {
              recipeName: this.query,
              cuisine: this.cuisinesSelected.join(','),
              diet: this.dietsSelected.join(','),
              intolerance: this.intolerancesSelected.join(','),
              number: this.limit
            }
          }
        );

        recipesList = response.data;

      }
      catch (error) {
        console.log(error);
      }
      this.results = [];
      this.results.push(...recipesList);
      if(this.results.length === 0){
        this.$root.toast("Searching " + this.query, "No results were found", false);
      }
      else{
        this.results.sort((a, b) => {
          return (1 - this.selected) * (b.aggregateLikes - a.aggregateLikes) + this.selected * (a.readyInMinutes - b.readyInMinutes);
        });
      }
    },
    handleUpdateIntolerances(newSelected){
      this.intolerancesSelected = newSelected;
    },
    handleUpdateDiets(newSelected){
      this.dietsSelected = newSelected;
    },
    handleUpdateCuisines(newSelected){
      this.cuisinesSelected = newSelected;
    }
  }
};
</script>

<style scoped>

#advance-search-collapse {
  margin: auto;
  justify-content: center;
  margin-bottom: 20px;
}

#advance-search-card {
  height: 350px;
}

#form-cards {
  display: flex;
  flex-direction: row; /* Place elements in a row */
  justify-content: center; /* Center elements horizontally */
  align-items: center;
  gap: 1rem; /* Adds space between each select element */
}

.AdvanceSearcher {
  flex-grow: 1; /* Allow the elements to grow */
  max-width: 100%; /* Ensure elements do not exceed the container's width */
  width: 100%; /* Set the initial width to 100% */
}

.search-bar {
  margin: auto;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  gap: 10px;
}

.search-bar input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.search-bar button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

.search-bar select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

</style>