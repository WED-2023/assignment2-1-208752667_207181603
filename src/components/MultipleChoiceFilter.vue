<template>
    <div>
        <b-card class="advance-card">
            <h4 class="title">{{ title }}:</h4>
            <div class="content">
                <div class="checkboxes">
                    <b-form-checkbox
                        v-model="allSelected"
                        :indeterminateSelected="indeterminateSelected"
                        aria-describedby="choices"
                        aria-controls="choices"
                        @change="toggleAllSelected">
                        {{ allSelected ? 'Un-select All' : 'Select All' }}
                    </b-form-checkbox>
                    <b-card class="check-list">
                        <b-form-checkbox-group
                            v-model="selected"
                            :options="choices"
                            class="ml-4"
                            aria-label="Individual choices"
                            stacked>
                        </b-form-checkbox-group>
                    </b-card>
                </div>
                <b-card class="selected-list">
                    <ul>
                        <li v-if="selected.length === 0">No choices selected</li>
                        <li v-for="(choice, index) in selected" :key="index">{{ choice }}</li>
                    </ul>
                </b-card>
            </div>
        </b-card>
    </div>
</template>


<script>
export default {
    data() {
        return {
            selected: [],
            allSelected: false,
            indeterminateSelected: false,
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        choices: {
            type: Array,
            required: true
        }
    },
    methods: {
        resetSelected() {
            this.selected = [];
        },
        toggleAllSelected(checked) {
            this.selected = checked ? this.choices.slice() : []
        }
    },
    watch: {
        selected(newValue, oldValue) {
            if (newValue.length === 0) {
                this.indeterminateSelected = false
                this.allSelected = false
            } else if (newValue.length === this.choices.length) {
                this.indeterminateSelected = false
                this.allSelected = true
            } else {
                this.indeterminateSelected = true
                this.allSelected = false
            }
            this.$emit('updateSelected', newValue);   
        }
    }
}
</script>

<style scoped>

.advance-card {
  padding: 1rem;
  height: 320px;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
}

.content {
  display: flex;
}

.checkboxes {
  flex: 1;
  margin-right: 1rem;
}

.check-list {
    width: 110%;
    max-height: 200px;
    overflow-y: auto;
}

.selected-list {
  flex: 1;
  margin-left: 1rem;
  margin-top: 20px;
  max-height: 200px; /* Adjust based on your needs */
  overflow-y: auto;
}

ul {
  list-style-type: none;
  padding: 0;
}

</style>