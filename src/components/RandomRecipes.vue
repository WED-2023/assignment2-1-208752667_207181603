<template>
    <div>
        <h3>Random Recipes</h3>
        <b-row align-h="center">
            <b-col lg="4" class="text-center">
                <b-button variant="success" @click="updateRecipes" style="margin-top: 5%;">Replace Recipes</b-button>
            </b-col>
        </b-row>
        <RowRecipePreviews :recipes="recipes" v-if="rowSizeComponent"/>
        <RecipePreviewList :recipes="recipes" v-else/>
    </div>
</template>

<script>
import RecipePreviewList from "./RecipePreviewList.vue";
import RowRecipePreviews from "./RowRecipePreviews.vue";
export default {
    name: "RandomRecipes",
    components: {
        RecipePreviewList,
        RowRecipePreviews
    },
    props: {
        amountOfRecipes: {
            type: Number,
            required: false,
            default() {
                return 1; // TODO CHANGE TO 3!
            }
        },
        rowSizeComponent: {
            type: Boolean,
            required: false,
            default() {
                return false;
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
            let fetchCount = this.rowSizeComponent ? this.amountOfRecipes : 2 * this.amountOfRecipes;

            try{
                const response = await this.axios.get(
                    this.$root.store.server_domain + `/recipes/random/${fetchCount}`
                );
                this.recipes = response.data.recipes;
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>