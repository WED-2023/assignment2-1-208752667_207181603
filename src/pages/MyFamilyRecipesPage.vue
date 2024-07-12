<template>
    <div class="container">
        <h1 class="title">Family Recipes</h1>
        <RecipePreviewList :recipes="recipes" />
    </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList.vue";

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
                const response = await this.axios.get(
                this.$root.store.server_domain + "/users/family");
                this.recipes = response.data;
            } catch (error) {
                this.$root.toast("Getting user family recipes failed", error.response.data.message, false);
            }
        }
    },
    created() {
        this.updateRecipes();
    }
};
</script>
