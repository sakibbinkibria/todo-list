import { mount, createLocalVue } from "@vue/test-utils";
import AddItem from "@/components/AddItem.vue";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("AddItem.vue", () => {
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      addTask: jest.fn(),
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
    return mount(AddItem, {
      localVue,
      store,
      propsData,
    });
  };

  it('disables the "ADD" button when taskTitle is empty', async () => {
    const wrapper = createWrapper({ title: "Add a Task" });

    const addButton = wrapper.find("button");
    expect(addButton.attributes("disabled")).toBeTruthy();

    await wrapper.setData({ taskTitle: "New Task" });

    expect(addButton.attributes("disabled")).toBeUndefined();
  });
});
