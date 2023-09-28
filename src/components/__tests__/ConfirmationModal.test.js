import { mount } from "@vue/test-utils";
import ConfirmationModal from "@/components/ConfirmationModal.vue";

describe("ConfirmationModal.vue", () => {
  const createWrapper = (propsData = {}) => {
    return mount(ConfirmationModal, {
      propsData,
    });
  };

  it('renders the modal with "pending" status', () => {
    const wrapper = createWrapper({ visible: true, status: "pending" });
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.text()).toContain(
      "Are you sure this task is complete and you want to remove it?"
    );
  });

  it('renders the modal with "completed" status', () => {
    const wrapper = createWrapper({ visible: true, status: "completed" });
    expect(wrapper.isVisible()).toBe(true);

    expect(wrapper.text()).toContain(
      "Are you sure you want to remove this task permanently?"
    );
  });

  it('emits "cancel" event when clicking "No" button', async () => {
    const wrapper = createWrapper({ visible: true, status: "pending" });
    const cancelButton = wrapper.find('[data-test="no-button"]');
    await cancelButton.trigger("click");

    expect(wrapper.emitted("cancel")).toBeTruthy();
  });

  it('emits "confirm" event when clicking "Yes" button', async () => {
    const wrapper = createWrapper({ visible: true, status: "pending" });
    const confirmButton = wrapper.find('[data-test="yes-button"]');
    await confirmButton.trigger("click");
    expect(wrapper.emitted("confirm")).toBeTruthy();
  });

  it('does not render when "visible" prop is false', () => {
    const wrapper = createWrapper({ visible: false, status: "pending" });
    expect(wrapper.isEmpty()).toBe(true);
  });
});
