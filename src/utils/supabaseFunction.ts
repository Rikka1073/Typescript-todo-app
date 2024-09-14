import { Todo } from "../domain/todo";
import { supabase } from "./supabase";

export const getAllTodos = async () => {
  const response = await supabase.from("study-record").select("*");

  if (response.error) {
    return new Error("Error fetching todos");
  }

  const todosData = response.data.map((todo) => {
    return new Todo(todo.id, todo.title, todo.time);
  });

  return todosData;
};
