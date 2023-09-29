import { shallowMount } from "@vue/test-utils";
import SelectDateModal from "@/components/SelectDateModal.vue";

describe("SelectDateModal.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SelectDateModal, {
      propsData: {
        currentDueDate: "2023-09-30", // Sample current due date for testing
      },
    });
  });

  it("renders correctly", () => {
    expect(wrapper.exists()).toBe(true);
  });

  it("initializes with selectedDate set to the current due date if provided", () => {
    expect(wrapper.vm.selectedDate).toBe("2023-09-30");
  });

  it("updates selectedDate when input value changes", async () => {
    const input = wrapper.find("input");
    await input.setValue("2023-10-01");

    expect(wrapper.vm.selectedDate).toBe("2023-10-01");
  });

  it("emits close event when cancel button is clicked", async () => {
    const cancelButton = wrapper.find("[data-test='cancel-button']");
    await cancelButton.trigger("click");

    expect(wrapper.emitted().close).toBeTruthy();
  });

  it("emits save event with selected date when save button is clicked", async () => {
    const saveButton = wrapper.find("[data-test='save-button']");
    await saveButton.trigger("click");

    expect(wrapper.emitted().save).toBeTruthy();
    expect(wrapper.emitted().save[0]).toEqual(["2023-09-30"]); // Check emitted data
  });
});
