import {test, expect} from "vitest";

function sum(a, b) {
  return a + b;
}

function hello() {
  return "Hello World!";
}

test("add 2 numbers", () => {
  expect(sum(2, 3)).toEqual(5);
});

test("hello world", () => {
  expect(hello()).toEqual("Hello World!");
});
