import { shallowMount } from "@vue/test-utils";
import ItemView from "@/components/ItemView.vue";

describe("ItemView.vue", () => {
  let wrapper;

  beforeEach(() => {
    const task = {
      id: "1",
      title: "Sample Task",
      status: "pending",
      dueDate: new Date(),
    };

    wrapper = shallowMount(ItemView, {
      propsData: {
        task,
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("displays task title correctly", () => {
    const titleElement = wrapper.find("[data-test='task-title']");
    expect(titleElement.text()).toBe("Sample Task");
  });

  it("toggles edit mode on edit button click", async () => {
    const actionsButton = wrapper.find("[data-test='actions-button']");
    await actionsButton.trigger("click");
    const editButton = wrapper.find("[data-test='edit-button']");
    await editButton.trigger("click");
    expect(wrapper.vm.editing).toBe(true);
  });

  it("toggles popup on actions button click", async () => {
    const actionsButton = wrapper.find("[data-test='actions-button']");
    await actionsButton.trigger("click");
    expect(wrapper.vm.showPopup).toBe(true);
  });

  it("correctly determines if the task is passed the due date", () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1); // Set current date to yesterday
    wrapper.setData({ dueDate: currentDate.toISOString() });
    expect(wrapper.vm.isPassedDueDate()).toBe(true);
  });
});
