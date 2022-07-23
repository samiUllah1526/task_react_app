// import { useQuery, useMutation, useQueryClient } from "react-query";
// import {
//   getUsers,
//   login,
//   getTasks,
//   addTask,
//   updateTask,
//   deleteTask,
// } from "./axios";

// export const queryUsers = useQuery("users", getUsers, {
//   select: (data) => data.sort((a, b) => b.id - a.id),
// });

// // export const register = useQuery("register", register);

// export const login = useQuery("login", login);

// export const queryTasks = useQuery("tasks", getTasks, {
//   select: (data) => data.sort((a, b) => b.id - a.id),
// });

// export const addTodoMutation = useMutation(addTask, {
//   onSuccess: () => queryClient.invalidateQueries("tasks"),
// });

// export const updateTodoMutation = useMutation(updateTask, {
//   onSuccess: () => queryClient.invalidateQueries("tasks"),
// });

// export const deleteTodoMutation = useMutation(deleteTask, {
//   onSuccess: () => queryClient.invalidateQueries("tasks"),
// });
