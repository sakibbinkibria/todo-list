<template>
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-black z-50 bg-opacity-50">
        <div class="bg-white p-5 rounded-lg shadow-lg">
            <p v-if="status==='pending'">Are you sure this task is complete and you want to remove it from pending list?</p>
            <p v-else>Are you sure you want to remove this task permanently?</p>
            <div class="mt-4 flex justify-end">
                <button @click="cancel" class="text-white font-semibold bg-red-500 p-2 rounded 2 mr-2" data-test="no-button">No</button>
                <button @click="confirm" class="text-white font-semibold bg-accent p-2 rounded 2" data-test="yes-button">Yes</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: Boolean,
        status: String
    },
    methods: {
        cancel() {
            this.$emit("cancel");
        },
        confirm() {
            this.$emit("confirm");
        },
    },
};
</script>
