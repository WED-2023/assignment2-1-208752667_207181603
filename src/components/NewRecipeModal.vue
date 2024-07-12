<template>
  <b-modal ref="createRecipeModal" id="create-recipe-modal" title="Create New Recipe" hide-header-close hide-footer>

    <p class="my-4">

      <b-form @submit.prevent="onSubmit" @reset.prevent="onReset" v-if="show">
        <b-form-group id="input-group-1" label="Recipe Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.title"
            placeholder="Enter recipe name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Image URL:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.image"
            placeholder="Enter image URL"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label="Ready In Minutes:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model.number="form.readyInMinutes"
            type="number"
            placeholder="Enter preparation time"
            required
            min="1"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Dishes:" label-for="input-11">
          <b-form-input
            id="input-11"
            v-model.number="form.servings"
            type="number"
            required
            min="1"
          ></b-form-input>
        </b-form-group>
        
        <b-form-group id="input-group-5">
          <b-form-checkbox v-model="form.vegetarian">Vegetarian</b-form-checkbox>
        </b-form-group>

        <b-form-group id="input-group-6">
          <b-form-checkbox v-model="form.vegan">Vegan</b-form-checkbox>
        </b-form-group>

        <b-form-group id="input-group-7">
          <b-form-checkbox v-model="form.glutenFree">Gluten-Free</b-form-checkbox>
        </b-form-group>

        <b-form-group id="input-group-9" label="Summary:" label-for="input-8">
          <b-form-textarea
            id="input-8"
            v-model="form.summary"
            placeholder="Enter summary"
            rows="3"
            max-rows="4"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-10">
          <b-form-checkbox v-model="form.familyRecipe">Family Recipe</b-form-checkbox>
        </b-form-group>

        <b-form-group id="input-group-11" label="Ingredients:">
          <div v-for="(ingredient, index) in form.extendedIngredients" :key="index" class="d-flex mb-2">
            <b-form-input
              v-model.number="ingredient.amount"
              type="number"
              class="mr-2"
              placeholder="Amount"
              required
              min="0"
            ></b-form-input>
            <b-form-input
              v-model="ingredient.unit"
              class="mr-2"
              placeholder="Unit"
              required
            ></b-form-input>
            <b-form-input
              v-model="ingredient.name"
              class="mr-2"
              placeholder="Ingredient"
              required
            ></b-form-input>
            
            <b-button @click="removeIngredient(index)" variant="transparent">
              <b-icon icon="x-circle" aria-hidden="true"></b-icon>
            </b-button>
          </div>
          <b-button @click="addIngredient" variant="success">
            <b-icon icon="plus" aria-hidden="true"></b-icon>
            Add Ingredient
          </b-button>
        </b-form-group>

        <b-form-group id="input-group-12" label="Instructions:">
          <div v-for="(instruction, index) in form.analyzedInstructions" :key="index" class="d-flex mb-2">
            <b-form-textarea
              v-model="instruction.step"
              rows="2"
              class="mr-2"
              placeholder="Instruction"
              required
            ></b-form-textarea>
            <b-button @click="removeInstruction(index)" variant="transparent">
              <b-icon icon="x-circle" aria-hidden="true"></b-icon>
            </b-button>
          </div>
          <b-button @click="addInstruction" variant="success" style="margin-bottom: 10px;">
            <b-icon icon="plus" aria-hidden="true"></b-icon>
            Add Step
          </b-button>
        </b-form-group>

        

        <b-button type="submit" variant="primary" style="margin-right: 5px;">Submit</b-button>
        <b-button type="reset" variant="danger" style="margin-right: 5px;">Reset</b-button>
        <b-button @click="onCancel" variant="outline-secondary">Cancel</b-button>
      </b-form>
    </p>
  </b-modal>
</template>

<script>

export default {
  data() {
    return {
      form: {
        title: '',
        image: '',
        readyInMinutes: 30,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        familyRecipe: false,
        summary: '',
        extendedIngredients: [],
        analyzedInstructions: [],
        servings: 1
      },
      show: true
    };
  },
  methods: {
    async addRecipe() {
      let success;
      let message;
      let nestedSteps = [{steps: this.form.analyzedInstructions}];
      try {

        const response = await this.axios.post(
          this.$root.store.server_domain + "/users/recipes",
          {
          image: this.form.image,
          title: this.form.title,
          readyInMinutes: this.form.readyInMinutes,
          servings: this.form.servings,
          vegetarian: this.form.vegetarian,
          vegan: this.form.vegan,
          glutenFree: this.form.glutenFree,
          familyRecipe: this.form.familyRecipe,
          summary: this.form.summary,
          extendedIngredients: this.form.extendedIngredients,
          analyzedInstructions: nestedSteps
          }
        );

        success = response.data.success;
        message = response.data.message;
        } 
        catch (err) {
          message = err.response.data.message;
          success = false;
        }
        this.$root.toast("Creating " + this.form.title, message, success);
        return success;
    },
    async onSubmit() {
      if(await this.addRecipe()){
        this.closeModalAndReset();
      }
    },
    onReset() {
      this.resetForm();
    },
    onCancel() {
      this.closeModalAndReset();
    },
    resetForm() {
      this.form = {
        title: '',
        image: '',
        readyInMinutes: 30,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        familyRecipe: false,
        summary: '',
        extendedIngredients: [],
        analyzedInstructions: [],
        servings: 1
      };
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    closeModalAndReset() {
      this.$refs.createRecipeModal.hide();
      this.resetForm();
    },
    addIngredient() {
      this.form.extendedIngredients.push(
        { amount: 0, unit: '', name: '' });
    },
    removeIngredient(index) {
      this.form.extendedIngredients.splice(index, 1);
    },
    addInstruction() {
      this.form.analyzedInstructions.push({step: ''});
    },
    removeInstruction(index) {
      this.form.analyzedInstructions.splice(index, 1);
    }
  }
};
</script>