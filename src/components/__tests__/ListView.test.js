import { mount, createLocalVue } from "@vue/test-utils";
import ListView from "@/components/ListView.vue";
import ItemView from "@/components/ItemView.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ListView.vue", () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      allTasks: jest.fn(),
      pendingTasks: jest.fn(),
      completedTasks: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
    });
  });

  const createWrapper = () => {
    return mount(ListView, {
      localVue,
      store,
    });
  };

  it("renders the default 'Pending Tasks' tab as active", () => {
    const wrapper = createWrapper();
    const activeTabButton = wrapper.find(".bg-blue-500");
    expect(activeTabButton.text()).toBe("Pending Tasks");
  });

  it("switches tabs when clicking on 'Completed Tasks' tab", async () => {
    const wrapper = createWrapper();

    const completedTabButton = wrapper.find(
      "button:contains('Completed Tasks')"
    );
    await completedTabButton.trigger("click");

    const activeTabButton = wrapper.find(".bg-blue-500");
    expect(activeTabButton.text()).toBe("Completed Tasks");
  });

  it("renders tasks in the 'Pending Tasks' tab", () => {
    getters.pendingTasks.mockReturnValue([
      { id: 1, title: "Task 1", status: "pending" },
      { id: 2, title: "Task 2", status: "pending" },
    ]);

    const wrapper = createWrapper();

    const itemViews = wrapper.findAllComponents(ItemView);
    expect(itemViews.length).toBe(2);
  });

  it("renders 'No tasks to show' message when there are no tasks in the tab", () => {
    getters.pendingTasks.mockReturnValue([]);

    const wrapper = createWrapper();

    const noTasksMessage = wrapper.find(".font-semibold.text-lg");
    expect(noTasksMessage.text()).toBe("No tasks to show");
  });

});
