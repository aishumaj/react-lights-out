import { render, fireEvent } from "@testing-library/react";
import Cell from "./Cell";

test("lit cell is lit", () => {
  const { container, debug } = render(<Cell isLit={true} />);
  expect(container.querySelector(".Cell-lit")).toBeInTheDocument();
});

test("unlit cell is not lit", () => {
  const { container, debug } = render(<Cell isLit={false} />);
  expect(container.querySelector(".Cell-lit")).not.toBeInTheDocument();
});

test("matches snapshot", function () {
  const { container } = render(<Cell />);
  expect(container).toMatchSnapshot();
});