import { mount, createLocalVue } from "@vue/test-utils";
import ItemView from "@/components/ItemView.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("ItemView.vue", () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      deleteTask: jest.fn(),
    };

    store = new Vuex.Store({
      modules: {
        tasks: {
          namespaced: true,
          actions,
        },
      },
    });
  });

  const createWrapper = (propsData = {}) => {
    return mount(ItemView, {
      localVue,
      store,
      propsData,
    });
  };

  it("renders the task title", () => {
    const task = {
      id: 1,
      title: "Sample Task",
      status: "pending",
    };
    const wrapper = createWrapper({ task });
    expect(wrapper.text()).toContain("Sample Task");
  });

  it('toggles editing mode when clicking the "EDIT" button', async () => {
    const task = {
      id: 2,
      title: "Another Task",
      status: "pending",
    };
    const wrapper = createWrapper({ task });

    const editButton = wrapper.find('[data-test="edit-button"]');
    await editButton.trigger("click");

    expect(wrapper.vm.editing).toBe(true);

    const saveButton = wrapper.find('[data-test="save-button"]');
    await saveButton.trigger("click");

    expect(wrapper.vm.editing).toBe(false);
  });

  it('opens and closes the confirmation modal when clicking "REMOVE"', async () => {
    const task = {
      id: 3,
      title: "Yet Another Task",
      status: "pending",
    };
    const wrapper = createWrapper({ task });

    await wrapper.setData({ taskTitle: "New Task" });
    const removeButton = wrapper.find('[data-test="remove-button"]');
    await removeButton.trigger("click");

    expect(wrapper.vm.showConfirmationModal).toBe(true);

    await wrapper.vm.removeTask();
    expect(wrapper.vm.showConfirmationModal).toBe(false);
  });
});
