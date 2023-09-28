<template>
    <div class="rounded-lg shadow-lg p-2 md:p-5 w-full md:w-2/3 mt-2 mb-2 flex justify-between items-center" :class="{ 'bg-white': !isPassedDueDate(), 'bg-red-200': isPassedDueDate() }">
        <div class="flex flex-col min-w-[40px] mr-2">
            <div v-if="task.status === 'pending'" class="text-yellow-500 text-2xl mr-2">
                <i class="fa fa-exclamation-circle text-yellow-600 mr-2" aria-hidden="true"></i>
            </div>
            <div v-else-if="task.status === 'completed'" class="text-green-500 mr-2 text-2xl">
                <i class="fa fa-check-circle text-green-500 mr-2" aria-hidden="true"></i>
            </div>
            <div v-if="dueDate" class="text-xs">
                Due: {{ formatDate(dueDate) }}
            </div>
            <div v-else class="text-xs">
                No due date
            </div>
        </div>

        <p v-if="!editing" class="text-center">{{ task.title }}</p>
        <input v-else v-model="taskTitle" type="text" class="border-2 border-accent rounded 2 p-2" />
        <div class="flex relative">
            <button v-if="!editing && task.status === 'completed'" @click="openConfirmationModal" class="text-white font-semibold bg-accent p-2 ml-2 rounded 2"
                data-test="actions-button">
                Remove
            </button>
            <button v-else-if="!editing" @click="togglePopup" class="text-white font-semibold bg-accent p-2 ml-2 rounded 2"
                data-test="actions-button">
                Actions
            </button>
            <button v-else @click="handleSave" class="text-white font-semibold bg-accent p-2 mr-2 rounded 2 ml-2"
                data-test="save-button">
                Save
            </button>
            <!-- Popup menu -->
            <div v-if="showPopup" class="absolute right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
                style="min-width: 160px;">
                <button @click="toggleEdit"
                    class="block w-full p-2 text-left hover:bg-accent hover:text-white border-b border-gray-300">
                    Edit
                </button>
                <button @click="openConfirmationModal"
                    class="block w-full p-2 text-left hover:bg-accent hover:text-white border-b border-gray-300">
                    Mark as done
                </button>
                <button @click="duplicateTask"
                    class="block w-full p-2 text-left hover:bg-accent hover:text-white border-b border-gray-300">
                    Duplicate
                </button>
                <button @click="setDueDate" class="block w-full p-2 text-left hover:bg-accent hover:text-white">
                    Set Due Date
                </button>
            </div>
        </div>

        <ConfirmationModal :visible="showConfirmationModal" :status="task.status" @cancel="closeConfirmationModal"
            @confirm="removeTask" />
        <SelectDateModal v-if="showDateModal" :currentDueDate="task.dueDate" @close="closeDateModal" @save="saveDueDate" />
    </div>
</template>

<style scoped>
/* Style for the hover effect */
.button:hover {
    background-color: var(--bg-accent-color);
    /* Change to your button background color */
    color: white;
}
</style>


<script>
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import SelectDateModal from "@/components/SelectDateModal.vue";
import { mapActions } from "vuex";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { v1 } from 'uuid';

library.add(faCheckCircle, faExclamationCircle);

export default {
    name: "ItemView",
    data() {
        return {
            editing: false,
            taskTitle: this.task.title,
            showConfirmationModal: false,
            showPopup: false, // Flag to toggle the popup menu
            showDateModal: false, // Flag to toggle the date selection modal
            dueDate: this.task.dueDate, // Store the selected due date
        };
    },
    props: {
        task: {},
    },
    components: {
        ConfirmationModal,
        SelectDateModal,
    },
    mounted() {
        window.addEventListener('click', this.closePopupOnOutsideClick);
    },
    beforeDestroy() {
        window.removeEventListener('click', this.closePopupOnOutsideClick);
    },
    methods: {
        ...mapActions(["addTask", "deleteTask", "editTask"]),
        toggleEdit() {
            this.editing = !this.editing;
            this.showPopup = false; // Close the popup menu after clicking "Edit"
        },
        handleSave() {
            this.editTask({
                id: this.task.id,
                title: this.taskTitle,
                status: 'pending',
            });
            this.toggleEdit();
        },
        togglePopup() {
            this.showPopup = !this.showPopup;
        },
        closePopupOnOutsideClick(event) {
            if (!this.$el.contains(event.target)) {
                // Clicked outside the component
                this.showPopup = false;
            }
        },
        duplicateTask() {
            this.addTask({
                id: v1(),
                title: this.task.title,
                status: 'pending'
            });
            this.showPopup = false; // Close the popup menu after clicking "Duplicate"
        },
        openConfirmationModal() {
            this.showConfirmationModal = true;
        },
        closeConfirmationModal() {
            this.showConfirmationModal = false;
        },
        removeTask() {
            this.deleteTask(this.task.id);
            this.showConfirmationModal = false;
        },
        completeTask() {
            // Implement complete task logic here
        },
        setDueDate() {
            this.showPopup = false; // Close the popup menu after clicking "Set Due Date"
            this.showDateModal = true; // Show the date selection modal
        },

        closeDateModal() {
            this.showDateModal = false; // Close the date selection modal
        },

        saveDueDate(selectedDate) {
            // Save the selected date to the component's data
            this.dueDate = selectedDate;
            this.editTask({
                id: this.task.id,
                title: this.taskTitle,
                status: 'pending',
                dueDate: selectedDate
            });
            this.showDateModal = false; // Close the date selection modal
        },

        isPassedDueDate() {
            const currentDate = new Date();
            return new Date(this.dueDate) < currentDate;
        },

        formatDate(dateString) {
            const date = new Date(dateString);
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return date.toLocaleDateString(undefined, options);
        }
    },
};
</script>
