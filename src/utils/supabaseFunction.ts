import { Todo } from "../domain/todo";
import { supabase } from "./supabase";

export const getAllTodos = async (): Promise<Todo[]> => {
  const todos = await supabase.from("study-record").select("*");
  console.log(todos.data);

  const todosData = todos.data.map((todo) => {
    return new Todo(todo.id, todo.title, todo.time);
  });

  return todosData;
};
