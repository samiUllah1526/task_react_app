import axios from "axios";
import { getAuthorizationHeader } from "../utlities";

const publicApi = axios.create({
  baseURL: process.env.REACT_APP_APUI_URL,
});

const privateApi = axios.create({
  baseURL: process.env.REACT_APP_APUI_URL,
});

export const getUsers = async () => {
  const response = await publicApi.get("/users");
  return response.data;
};

export const register = async (user) => {
  const response = await publicApi.post("/auth/register", user);
  return response.data;
};

export const login = async (user) => {
  const response = await publicApi.post("/auth/login", user);
  return response.data;
};

export const getTasks = async () => {
  const response = await privateApi.get("/tasks", getAuthorizationHeader());
  return response.data;
};

export const getTaskByID = async (id) => {
  if (!id) return {};

  const response = await privateApi.get(
    `/tasks/${id}`,
    getAuthorizationHeader()
  );
  return response.data;
};

export const addTaskByID = async (id, task) => {
  const response = await privateApi.patch(
    `/tasks/${id}`,
    task,
    getAuthorizationHeader()
  );
  return response.data;
};

export const addTask = async (task) => {
  console.log("add task", task);
  const response = await privateApi.post(
    "/tasks",
    task,
    getAuthorizationHeader()
  );
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await privateApi.patch(
    `/tasks/${id}`,
    task,
    getAuthorizationHeader()
  );
  return response.data;
};

export const deleteTask = async (ids) => {
  const response = await privateApi.post(
    `/tasks/bulk-delete`,
    ids,
    getAuthorizationHeader()
  );
  return response.data;
};

export default privateApi;
