<template>
    <div>
        <h3>Random Recipes</h3>
        <b-row align-h="center">
            <b-col lg="4">
                <b-button variant="success" @click="updateRecipes" style="margin-top: 5%;">Replace Recipes</b-button>
            </b-col>
        </b-row>
        <RowRecipePreviews :recipes="recipes" />
    </div>
</template>

<script>
import RowRecipePreviews from "./RowRecipePreviews.vue";
import { mockGetRandomRecipes } from "../services/recipes.js";
export default {
    name: "RandomRecipes",
    components: {
        RowRecipePreviews
    },
    props: {
        amountOfRecipes: {
            type: Number,
            required: false,
            default() {
                return 3;
            }
        }
    },
    data() {
        return {
            recipes: []
        };
    },
    mounted() {
        this.updateRecipes();
    },
    methods: {
        async updateRecipes() {
            let recipesList = [];
            try {
            // const response = await this.axios.get(
            //   this.$root.store.server_domain + "/recipes/random",
            // );

            // Replace the mock
            const response = mockGetRandomRecipes(this.amountOfRecipes);
            recipesList = response.data.recipes;
            } catch (error) {
                console.log(error);
            }
            this.recipes = [];
            this.recipes.push(...recipesList);
        }
    }
}
</script>