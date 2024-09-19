import App from "../App";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Todo } from "../domain/todo";
// import { getAllTodos } from "../utils/supabaseFunction";

const mockGetAllTodos = jest
  .fn()
  .mockResolvedValue([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4)])
  .mockReturnValueOnce([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4), new Todo("5", "test5", 5)]);

jest.mock("../utils/supabaseFunction", () => {
  return { getAllTodos: () => mockGetAllTodos() };
});

describe("App", () => {
  it("タイトルがあること", () => {
    render(<App />);
    const title = screen.getByTestId("title");
    expect(title).toBeInTheDocument();
  });

  it("ローディング中のタイトルがあること", () => {
    render(<App />);
    const title = screen.getByTestId("loading-title");
    expect(title).toBeInTheDocument();
  });

  it("新規作成のボタンがあること", () => {
    render(<App />);
    const button = screen.getByTestId("create-button");
    expect(button).toBeInTheDocument();
  });

  it("データが表示されること", async () => {
    render(<App />);
    await waitFor(() => {
      screen.getAllByTestId("todos-data");
      screen.debug();
    });
  });

  it("登録できること", async () => {
    render(<App />);

    const button = screen.getByTestId("create-button");
    fireEvent.click(button);

    await waitFor(() => {
      const todosData = screen.getAllByTestId("todos-data");
      expect(todosData).toHaveLength(4);
      screen.debug();
    });
  });
});
