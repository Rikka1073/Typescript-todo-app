import { supabase } from "./supabase";

export const getAllTodos = async = () => {
  const todos = await supabase.from("study-record").select("*");
  console.log(todos.data);
};
