<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
    <b-collapse id="advance-search-collapse">
      <b-card id="advance-search-card">
        <b-form id="form-cards">
          <b-card class="advance-card">
            <h4>Intolerances:</h4>
            <b-form-checkbox
                v-model="allIntolerancesSelected"
                :indeterminateIntolerances="indeterminateIntolerances"
                aria-describedby="intolerancesChoices"
                aria-controls="intolerancesChoices"
                @change="toggleAllIntolerances">
                {{ allIntolerancesSelected ? 'Un-select All' : 'Select All' }}
              </b-form-checkbox>
            <b-card class="check-list">
              <b-form-checkbox-group id="intolerances"
                v-model="selectedIntolerances"
                :options="intolerancesChoices"
                :aria-describedby="ariaDescribedby"
                name="intolerances"
                class="ml-4"
                aria-label="Individual intolerancesChoices"
                stacked
                ></b-form-checkbox-group>
            </b-card>
            <div v-if="selectedIntolerances.length > 0" class="selected-list">
              <ul>
                <li v-for="(choice, index) in selectedIntolerances" :key="index">{{ choice }}</li>
              </ul>
            </div>
          </b-card>
          <b-card class="advance-card">
            <h5>Check List:</h5>
            <b-card class="check-list">
              <div v-for="(choice, index) in choices" :key="index" class="check-item">
                <input class="form-checkbox" type="checkbox" :id="'choice-' + index" :value="choice" v-model="selectedChoices"/>
                <label class="form-check-label" :for="'choice-' + index">{{ choice }}</label>
              </div>
            </b-card>
            <b-button pill @click="resetChoices" variant="warning">Reset</b-button>
            <div v-if="selectedChoices.length > 0" class="selected-list">
              <h5>Selected Choices:</h5>
              <ul>
                <li v-for="(choice, index) in selectedIntolerances" :key="index">{{ choice }}</li>
              </ul>
            </div>
          </b-card>
          <b-card class="advance-card">
            <h5>Check List:</h5>
            <b-card class="check-list">
              <div v-for="(choice, index) in choices" :key="index" class="check-item">
                <input class="form-checkbox" type="checkbox" :id="'choice-' + index" :value="choice" v-model="selectedChoices"/>
                <label class="form-check-label" :for="'choice-' + index">{{ choice }}</label>
              </div>
            </b-card>
            <b-button pill @click="resetChoices" variant="warning">Reset</b-button>
            <div v-if="selectedChoices.length > 0" class="selected-list">
              <h5>Selected Choices:</h5>
              <ul>
                <li v-for="(choice, index) in selectedChoices" :key="index">{{ choice }}</li>
              </ul>
            </div>
          </b-card>
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
import RecipePreviewList from "../components/RecipePreviewList";
import intolerances from "../assets/intolerances";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      query: '',
      limit: 5,
      results: [],
      intolerancesChoices: intolerances,
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
    },
    resetIntolerances() {
      this.selectedIntolerances = [];
    },
    resetChoices() {
      this.selectedChoices = [];
    },

    toggleAllIntolerances(checked) {
        this.selectedIntolerances = checked ? this.intolerancesChoices.slice() : []
      }
  },
  watch: {
    selectedIntolerances(newValue, oldValue) {
        // Handle changes in individual flavour checkboxes
        if (newValue.length === 0) {
          this.indeterminateIntolerances = false
          this.allIntolerancesSelected = false
        } else if (newValue.length === this.intolerancesChoices.length) {
          this.indeterminateIntolerances = false
          this.allIntolerancesSelected = true
        } else {
          this.indeterminateIntolerances = true
          this.allIntolerancesSelected = false
        }
      }
    }
};
</script>

<style scoped>

#advance-search-collapse {
  margin: auto;
  width: 80%;
  margin-bottom: 20px;
}

#advance-search-card {
  height: 350px;
}

#form-cards {
  display: flex;
  flex-direction: row; /* Place elements in a row */
  align-items: center;
  gap: 1rem; /* Adds space between each select element */
}

.advance-card {
  width: 100%;
  height: 320px;
}

.check-list {
  height: 130px;
  margin-bottom: 20px;
  overflow-y: auto;
}
.selected-list {
  height: 70px;
  overflow-y: auto;
}

.search-bar {
  margin: auto;
  width: 80%;
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