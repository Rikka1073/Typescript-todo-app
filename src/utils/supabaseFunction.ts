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

export const createTodo = async (studyText: string, studyTime: number) => {
  await supabase.from("study-record").insert({ title: studyText, time: studyTime }).select();
};

export const deleteTodo = async (id: string) => {
  await supabase.from("study-record").delete().eq("id", id);
};

export const updateTodo = async (newStudyText: string, newStudyTime: number, id: string) => {
  await supabase.from("study-record").update({ title: newStudyText, time: newStudyTime }).eq("id", id);
};
