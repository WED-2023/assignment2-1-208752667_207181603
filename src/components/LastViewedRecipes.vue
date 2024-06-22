<template>
    <div>
        <h3>Last Viewed Recipes</h3>
        <RowRecipePreviews :recipes="lastViewedRecipes" style="margin-top: 9.3%;"/>
    </div>
</template>

<script>

import RowRecipePreviews from "./RowRecipePreviews.vue";
import { mockGetLastViewedRecipes } from "../services/recipes.js";

export default {
    name: "LastViewedRecipes",
    components: {
        RowRecipePreviews
    },
    data() {
        return {
            lastViewedRecipes: []
        };
    },
    mounted() {
        this.getLastViewedRecipes();
    },
    methods: {
        async getLastViewedRecipes() {
            let recipesList = [];
            try {

            // Replace the mock
            const response = mockGetLastViewedRecipes(3);
            recipesList = response.data.recipes;
            } catch (error) {
                console.log(error);
            }
            this.lastViewedRecipes = [];
            this.lastViewedRecipes.push(...recipesList);
        }
    }
};
</script>