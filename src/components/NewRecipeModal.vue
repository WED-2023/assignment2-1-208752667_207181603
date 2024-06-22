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
            min="0"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-4" label="Aggregate Likes:" label-for="input-4">
          <b-form-input
            id="input-4"
            v-model.number="form.aggregateLikes"
            type="number"
            placeholder="Enter likes count"
            required
            min="0"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-5" label="Vegetarian:">
          <b-form-checkbox v-model="form.vegetarian">Is Vegetarian</b-form-checkbox>
        </b-form-group>

        <b-form-group id="input-group-6" label="Vegan:">
          <b-form-checkbox v-model="form.vegan">Is Vegan</b-form-checkbox>
        </b-form-group>

        <b-form-group id="input-group-7" label="Gluten-Free:">
          <b-form-checkbox v-model="form.glutenFree">Is Gluten-Free</b-form-checkbox>
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
            <b-button @click="removeIngredient(index)" variant="danger">Remove</b-button>
          </div>
          <b-button @click="addIngredient" variant="success">Add Ingredient</b-button>
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
            <b-button @click="removeInstruction(index)" variant="danger">Remove</b-button>
          </div>
          <b-button @click="addInstruction" variant="success">Add Instruction</b-button>
        </b-form-group>

        <b-form-group id="input-group-11" label="Servings:" label-for="input-11">
          <b-form-input
            id="input-11"
            v-model.number="form.servings"
            type="number"
            placeholder="Enter servings"
            required
            min="0"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
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
        readyInMinutes: 0,
        aggregateLikes: 0,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: '',
        ingredients: [{ quantity: '', unit: '', name: '' }],
        instructions: [''],
        servings: 0
      },
      show: true
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.closeModalAndReset();
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
        readyInMinutes: 0,
        aggregateLikes: 0,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        summary: '',
        ingredients: [{ quantity: '', unit: '', name: '' }],
        instructions: [''],
        servings: 0
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