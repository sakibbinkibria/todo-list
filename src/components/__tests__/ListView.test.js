import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import ListView from "@/components/ListView.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ListView.vue", () => {
  let wrapper;
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      allTasks: jest.fn(() => []),
      pendingTasks: jest.fn(() => []),
      completedTasks: jest.fn(() => []),
    };

    store = new Vuex.Store({
      getters,
    });

    wrapper = shallowMount(ListView, {
      store,
      localVue,
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('initializes with activeTab set to "pending"', () => {
    expect(wrapper.vm.activeTab).toBe("pending");
  });

it('displays "No tasks to show" message when there are no tasks', () => {
  const noTasksMessage = wrapper.find("[data-test='no-tasks-message']");
  expect(noTasksMessage.text()).toBe("No tasks to show");
});

});
