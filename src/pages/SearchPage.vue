<template>
  <div class="container">
    <h1 class="title">Search Recipes</h1>
    <div>
      <b-collapse id="advance-search-collapse">
        <b-card id="advance-search-card">
          <b-form id="form-cards">
            <MultipleChoiceFilter class="AdvanceSearcher" title="Intolerances" :choices="intolerancesChoices"/>
            <MultipleChoiceFilter class="AdvanceSearcher" title="Diets" :choices="dietsChoices"/>
            <MultipleChoiceFilter class="AdvanceSearcher" title="Cuisines" :choices="cuisinesChoices"/>
          </b-form>
        </b-card>
      </b-collapse>
  </div>
    <div class="search-bar">
      <input type="text" v-model="query" @input="onSearch" placeholder="Search Recipes..."/>
      <em>Requested Amount of Recipes: </em>
      <b-form-select v-model="limit" @change="onSearch">
        <b-form-select-option value="5">5</b-form-select-option>
        <b-form-select-option value="10">10</b-form-select-option>
        <b-form-select-option value="15">15</b-form-select-option>
      </b-form-select>
      <b-button pill v-b-toggle="'advance-search-collapse'" variant="info">Advance Search</b-button>
    <b-button pill @click="onSearch" variant="success">Search</b-button>
    </div>
    <div class="search-results">
      <RecipePreviewList title="Search Results"/>
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
      selectedIntolerances: [],
      allIntolerancesSelected: false,
      indeterminateIntolerances: false,
      choices: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5", "Option 6", "Option 7", "Option 8", "Option 9", "Option 10"],
      selectedChoices: []
    };
  },
  computed: {
    limitedResults() {
      return this.results.slice(0, this.limit);
    }
  },
  methods: {
    onSearch() {
      // Todo - complete search logic
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