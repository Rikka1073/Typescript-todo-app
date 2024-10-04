import App from "../App";
import { fireEvent, getAllByText, getByText, render, screen, waitFor } from "@testing-library/react";
import { Todo } from "../domain/todo";

const mockGetAllTodos = jest.fn().mockResolvedValue([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4)]);
const mockDeleteTodo = jest.fn().mockResolvedValueOnce(true);

jest.mock("../utils/supabaseFunction", () => {
  return {
    getAllTodos: () => mockGetAllTodos(),
    deleteTodo: () => mockDeleteTodo(),
  };
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

    const button = screen.getByTestId("modal-button");
    expect(button).toBeInTheDocument();
  });

  it("データが4つ表示されること", async () => {
    render(<App />);

    await waitFor(() => {
      const todosData = screen.getAllByTestId("todos-data");
      expect(todosData).toHaveLength(4);
    });
  });

  it("登録できること", async () => {
    mockGetAllTodos.mockResolvedValue([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4), new Todo("5", "test5", 5)]);
    render(<App />);

    const modalButton = screen.getByTestId("modal-button");
    fireEvent.click(modalButton);

    await waitFor(() => {
      const createButton = screen.getByTestId("create-button");
      fireEvent.click(createButton);
      const todosData = screen.getAllByTestId("todos-data");
      expect(todosData).toHaveLength(5);
    });
  });

  it("モーダルのタイトルがあること", async () => {
    render(<App />);

    const button = screen.getByTestId("modal-button");
    fireEvent.click(button);

    await waitFor(() => {
      const modalTitle = screen.getByTestId("modal-title");
      expect(modalTitle).toBeInTheDocument();
    });
  });

  it("学習内容がないときに登録するとエラーがでる", async () => {
    mockGetAllTodos.mockResolvedValue([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4), new Todo("5", "test5", 5), new Todo("6", "", 0)]);
    render(<App />);

    const button = screen.getByTestId("modal-button");
    fireEvent.click(button);

    await waitFor(() => {
      const errorText = screen.getByTestId("errors-text");
      expect(errorText).toBeInTheDocument();
    });
  });

  it("削除ができること", async () => {
    mockGetAllTodos.mockResolvedValue([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4), new Todo("5", "test5", 5)]);
    render(<App />);

    await waitFor(() => {
      const deleteButton = screen.getByTestId("delete-button-5");
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      const todosData = screen.queryAllByTestId("todos-data");
      expect(todosData).toHaveLength(5);
    });
  });

  it("モーダルの編集タイトルがあること", async () => {
    render(<App />);

    await waitFor(() => {
      const editButton = screen.getByTestId("edit-button-1");
      fireEvent.click(editButton);
    });

    await waitFor(() => {
      const editModalTitle = screen.getByTestId("edit-modal-title");
      expect(editModalTitle).toBeInTheDocument();
    });
  });

  it("編集が反映されていること", async () => {
    mockGetAllTodos.mockResolvedValue([new Todo("1", "test1", 1), new Todo("2", "test2", 2), new Todo("3", "test3", 3), new Todo("4", "test4", 4), new Todo("5", "test6", 10)]);
    render(<App />);

    await waitFor(() => {
      const editButton = screen.getByTestId("edit-button-5");
      fireEvent.click(editButton);
    });

    await waitFor(() => {
      const saveButton = screen.getByTestId("edit-modal-title");
      fireEvent.click(saveButton);
      screen.getByText("test6");
    });
  });
});
