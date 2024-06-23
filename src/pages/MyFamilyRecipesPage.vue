<template>
    <div>
        <h3>Random Recipes</h3>
        <RecipePreviewList :recipes="recipes" />
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";
import { mockGetFamilyRecipes } from "../services/recipes.js";

export default {
    name: "FamilyRecipes",
    components: {
        RecipePreviewList
    },
    data() {
        return {
            recipes: []
        };
    },
    methods: {
        async updateRecipes() {
            try {
                // Replace the mock
                const response = mockGetFamilyRecipes(); 
                this.recipes = response.data.recipes;
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.updateRecipes();
    }
};
</script>
