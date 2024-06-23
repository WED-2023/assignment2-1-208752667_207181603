<template>
  <b-modal ref="createRecipeModal" id="create-recipe-modal" title="Create New Recipe" hide-header-close hide-footer>

    <p class="my-4">

      <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

        <b-form-group id="input-group-11" label="Dishes:" label-for="input-11">
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

        <b-form-group id="input-group-8" label="Summary:" label-for="input-8">
          <b-form-textarea
            id="input-8"
            v-model="form.summary"
            placeholder="Enter summary"
            rows="3"
            max-rows="4"
            required
          ></b-form-textarea>
        </b-form-group>

        <b-form-group id="input-group-9" label="Ingredients:">
          <div v-for="(ingredient, index) in form.ingredients" :key="index" class="d-flex mb-2">
            <b-form-input
              v-model.number="ingredient.quantity"
              type="number"
              class="mr-2"
              placeholder="Quantity"
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

        <b-form-group id="input-group-10" label="Instructions:">
          <div v-for="(instruction, index) in form.instructions" :key="index" class="d-flex mb-2">
            <b-form-textarea
              v-model="form.instructions[index]"
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
import { mockAddUserRecipe } from "../services/user.js";

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
        summary: '',
        ingredients: [],
        instructions: [],
        servings: 1
      },
      show: true
    };
  },
  methods: {
    async addRecipe() {
      try {

        // const response = await this.axios.post(
        //   // "https://test-for-3-2.herokuapp.com/user/Register",
        //   this.$root.store.server_domain + "/Register",

        //   {
        //     username: this.form.username,
        //     password: this.form.password
        //   }
        // );

        const recipeDetails = {
          title: this.form.title,
          image: this.form.image,
          readyInMinutes: this.form.readyInMinutes,
          vegetarian: this.form.vegetarian,
          vegan: this.form.vegan,
          glutenFree: this.form.glutenFree,
          summary: this.form.summary,
          ingredients: this.form.ingredients,
          instructions: this.form.instructions,
          servings: this.form.servings
        };

        const response = mockAddUserRecipe(recipeDetails);

        success = response.response.data.success;
        } catch (err) {
          console.log(err.response);
          this.form.submitError = err.response.data.message;
        }
        return success;
    },
    onSubmit(event) {
      let success = addRecipe();
      event.preventDefault();
      this.closeModalAndReset();
      let message = success ? "Recipe created successfully" : "Failed to create recipe";
      this.$root.toast("Creating " + this.form.title, message, success);
    },
    onReset(event) {
      event.preventDefault();
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
        summary: '',
        ingredients: [],
        instructions: [],
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
      this.form.ingredients.push({ quantity: 0, unit: '', name: '' });
    },
    removeIngredient(index) {
      this.form.ingredients.splice(index, 1);
    },
    addInstruction() {
      this.form.instructions.push('');
    },
    removeInstruction(index) {
      this.form.instructions.splice(index, 1);
    }
  }
};
</script>