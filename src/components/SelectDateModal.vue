<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
        <div class="bg-white p-5 rounded-lg shadow-lg">
            <h2 class="text-lg font-semibold mb-4">Select Due Date</h2>
            <input type="date" v-model="selectedDate" class="border rounded p-2 mb-4" />
            <div class="flex justify-end">
                <button @click="closeModal" class="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded mr-2"
                    data-test="cancel-button">Cancel</button>
                <button @click="saveDate" class="text-white bg-accent hover:bg-blue-600 px-4 py-2 rounded"
                    data-test="save-button">Save</button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        currentDueDate: String,
    },
    data() {
        return {
            selectedDate: this.currentDueDate || '', // Store the selected date
        };
    },
    methods: {
        closeModal() {
            this.$emit('close'); // Emit an event to close the modal
        },
        saveDate() {
            // Format the selected date to 'dd MMM yyyy' format
            if (this.selectedDate) {
                this.$emit('save', this.selectedDate); // Emit an event to save the date in 'dd MMM yyyy' format
            }
        },
    },
};
</script>
