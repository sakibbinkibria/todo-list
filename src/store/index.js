import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pendingTasks: [],
    completedTasks: []
  },
  getters: {
    allTasks: (state) => [...state.pendingTasks, ...state.completedTasks],
    pendingTasks: (state) => state.pendingTasks,
    completedTasks: (state) => state.completedTasks
  },
  mutations: {
    addTask(state, task) {
      state.pendingTasks.push(task);
    },
    deleteTask(state, taskId) {
      let selectedTask = state.pendingTasks.find((task) => task.id === taskId);
      if(!selectedTask) {
        selectedTask = state.completedTasks.find((task) => task.id === taskId);
      }
      if(selectedTask.status === 'completed'){
        state.completedTasks = state.completedTasks.filter(
          (task) => task.id !== taskId
        );
      } else {
        selectedTask.status = "completed";
        state.completedTasks.push(selectedTask);
        state.pendingTasks = state.pendingTasks.filter(
          (task) => task.id !== taskId
        );
      }
    },
    editTask(state, selectedTask) {
      state.pendingTasks.find((task) => {
        if (task.id === selectedTask.id) {
          task.title = selectedTask.title;
          task.status = selectedTask.status;
          task.dueDate = selectedTask.dueDate;
        }
      });
    },
  },
  actions: {
    addTask({ commit }, task) {
      commit("addTask", task);
    },
    deleteTask({ commit }, id) {
      commit("deleteTask", id);
    },
    editTask({ commit }, task) {
      commit("editTask", task);
    },
  },
  modules: {},
});
