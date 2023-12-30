import {mount} from "@vue/test-utils";
import GuessAge from "@/components/GuessAge.vue";
import { expect, it } from "vitest";


it("testing GuessAge component props", async () => {
  expect(GuessAge.props.title).toBe(String);
});

it("updates the search ref when typing into the input field", async () => {
  const wrapper = mount(GuessAge);
  const input = wrapper.find('input');
  await input.setValue('John');
  expect(wrapper.vm.search).toBe('John');
});
