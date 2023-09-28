<template>
  
    <div class="p-2 max-w-3xl w-full md:w-3/4 xl:w-1/2 m-5 flex flex-col items-center">
      <div class="text-3xl font-semibold mb-4">{{ title }}</div>
      <input v-model="taskTitle" type="text" class="border-2 border-accent rounded 5 p-3 w-5/6 md:w-2/3"/>
      <button @click="handleAdd" class="text-white p-1 w-5/6 sm:w-1/3 mt-5 rounded 5 font-semibold" data-test="add-button"
        :disabled="!taskTitle"
        :class="{ 'bg-accent': taskTitle, 'bg-gray-400': !taskTitle }">
        ADD
      </button>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { v1 } from 'uuid';
export default {
  name: 'AddItem',
  data() {
    return {
      taskTitle: "",
    }
  },
  props: {
    title: String
  },
  methods: {
    ...mapActions(["addTask"]),
    handleAdd(){
      this.addTask({
        id: v1(),
        title: this.taskTitle,
        status: 'pending'
      });
      this.taskTitle = '';
    }
  }
}
</script>
