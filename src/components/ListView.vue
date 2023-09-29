<template>
    <div class=" w-full md:w-4/5 flex flex-col items-center">
        <div class="text-2xl font-semibold mb-4">Your Tasks</div>
        <div class="flex space-x-4">
            <button @click="activeTab = 'pending'" :class="tabClass('pending')">Pending Tasks</button>
            <button @click="activeTab = 'completed'" :class="tabClass('completed')">Completed Tasks</button>
            <button @click="activeTab = 'all'" :class="tabClass('all')">All Tasks</button>
        </div>

        <div v-if="tasksByTab(activeTab).length > 0" class="w-full mt-2">
            <div v-for="task in tasksByTab(activeTab)" :key="task.id" class="w-full flex flex-col items-center">
                <ItemView :task="task" />
            </div>
        </div>
        <div v-else class="font-semibold text-lg mt-2" data-test="no-tasks-message">No tasks to show</div>
    </div>
</template>

<script>
import ItemView from "@/components/ItemView.vue";
import { mapGetters } from "vuex";

export default {
    name: "ListView",
    components: {
        ItemView,
    },
    computed: {
        ...mapGetters(["allTasks", "pendingTasks", "completedTasks"]),
    },
    data() {
        return {
            activeTab: "pending",
        };
    },
    methods: {
        tabClass(tab) {
            return {
                'bg-activerTab': this.activeTab === tab,
                'text-white': this.activeTab === tab,
                'bg-gray-600': this.activeTab !== tab,
                'text-gray-800': this.activeTab !== tab,
                'rounded-t-md': true,
                'px-4': true,
                'py-2': true,
                'hover:bg-hoverTab text-white': true,
            };
        },
        tasksByTab(tab) {
            if (tab === 'pending') {
                return this.pendingTasks;
            } else if (tab === 'completed') {
                return this.completedTasks;
            } else {
                return this.allTasks;
            }
        },
    },
};
</script>
