import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

test("Board Renders with m*n Cells", () => {
  const { container, debug } = render(<Board nrows={4} ncols={6} />);
  expect(container.querySelectorAll(".Cell").length).toEqual(24);
});

test("Checks You Won message after win", () => {
  const { container, debug } = render(
    <Board nrows={4} ncols={6} chanceLightStartsOn={0} />
  );
  expect(container.querySelector("div")).toContainHTML("<div>You won!</div>");
});

test("Checks No You Won message before win", () => {
  const { container, debug } = render(
    <Board nrows={4} ncols={6} chanceLightStartsOn={1} />
  );
  expect(container).not.toContainHTML("<div>You won!</div>");
});

test("Checks that clicking first cell changes it, below, and right", () => {
  const { container, debug } = render(
    <Board nrows={3} ncols={3} chanceLightStartsOn={1} />
  );
  expect(container.querySelectorAll(".Cell-lit").length).toEqual(9);
  fireEvent.click(container.querySelector(".Cell"));
  expect(container.querySelectorAll(".Cell-lit").length).toEqual(6);
  expect(container.querySelector("td[key='1-2']")).toBeInTheDocument();
  
});

test("matches snapshot", function () {
  const { container } = render(<Board />);
  expect(container).toMatchSnapshot();
});
