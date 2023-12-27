import {mount} from "@vue/test-utils";
import GuessAge from "@/components/GuessAge.vue";
import { expect, test, it } from "vitest";
const wrapper = mount(GuessAge);

it("testing GuessAge component props", async () => {
  expect(GuessAge.props.title).toBe(String);
});

it("Test if data is a function", () => {
  expect(typeof GuessAge.data).toBe("function");
});
