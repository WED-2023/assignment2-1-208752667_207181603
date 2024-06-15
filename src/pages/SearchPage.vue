<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <div>
    <b-collapse id="collapse-1" vertical>
      <b-card class="p-3">
        <b-form class="form-spacious">
          <div  class="form-select">
            <b-form-select v-model="selected" :options="options" multiple :select-size="4"></b-form-select>
          </div>
          <div  class="form-select">
            <b-form-select v-model="selected" :options="options" multiple :select-size="4"></b-form-select>
          </div>
          <div  class="form-select">
            <b-form-select v-model="selected" :options="options" multiple :select-size="4"></b-form-select>
          </div>
        </b-form>
      </b-card>
    </b-collapse>
  </div>
    <div class="search-bar">
      
      <input
        type="text"
        v-model="query"
        @input="onSearch"
        placeholder="Search..."
      />
      <select v-model="limit" @change="onSearch">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
      
      <b-button v-b-toggle="'collapse-1'" variant="info">Advance Search</b-button>
    <b-button @click="onSearch" variant="success">Search</b-button>
    </div>
    <div class="search-results">
      <RecipePreviewList title="Search Results"/>
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList
  },
  data() {
    return {
      query: '',
      limit: 5,
      results: [],
      filters: {
        option1: false,
        option2: false,
        option3: false
      },
      selected: ['b'], // Array reference
        options: [
          { value: 'a', text: 'This is First option' },
          { value: 'b', text: 'Default Selected Option' },
          { value: 'c', text: 'This is another option' },
          { value: 'e', text: 'This is option e' },
          { value: 'f', text: 'This is option f' }
        ]
    };
  },
  computed: {
    limitedResults() {
      return this.results.slice(0, this.limit);
    }
  },
  methods: {
    onSearch() {
      // Example search logic, replace with your actual search logic
      const allResults = [
        'Result 1',
        'Result 2',
        'Result 3',
        'Result 4',
        'Result 5',
        'Result 6',
        'Result 7',
        'Result 8',
        'Result 9',
        'Result 10',
        'Result 11',
        'Result 12',
        'Result 13',
        'Result 14',
        'Result 15',
      ];

      // Filter results based on query and filters
      this.results = allResults.filter(item => {
        const matchesQuery = item.toLowerCase().includes(this.query.toLowerCase());
        const matchesFilter = (!this.filters.option1 || item.includes('Option 1')) &&
                              (!this.filters.option2 || item.includes('Option 2')) &&
                              (!this.filters.option3 || item.includes('Option 3'));
        return matchesQuery && matchesFilter;
      });
    }
  }
};
</script>

<style scoped>
#collapse-1 {
  margin-bottom: 20px;
}

.form-spacious {
  display: flex;
  flex-direction: row; /* Place elements in a row */
  gap: 1rem; /* Adds space between each select element */
}

.form-select {
  flex: 1; /* Allows the selects to grow and fill the available space */
}

.search-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
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