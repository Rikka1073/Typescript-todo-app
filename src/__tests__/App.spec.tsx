import App from "../App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("タイトルがあること", () => {
    render(<App />);

    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
    screen.debug();
  });

  it("ローディング中のタイトルがあること", () => {
    render(<App />);
    const title = screen.getByTestId("loading-title");
    expect(title).toBeInTheDocument();
    screen.debug();
  });

  it("新規作成のボタンがあること", () => {
    render(<App />);
    const button = screen.getByTestId("create-button");
    expect(button).toBeInTheDocument();
    screen.debug();
  });
});
