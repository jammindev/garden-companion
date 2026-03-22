import axiosInstance from "../../../../api/axios";

import backendRoutes from "@/api/apiRoutes";

export const getTodosApi = async () => {
  try {
    const response = await axiosInstance.get(backendRoutes.todos);
    return response.data;
  } catch (error) {
    throw new Error("can't fetch todos");
  }
};

export interface CreateToDoInterface {
  priority: string;
  title: string;
}

export const createToDoApi = async (data: CreateToDoInterface) => {
  try {
    const response = await axiosInstance.post(backendRoutes.todos, data);
    return response.data;
  } catch (error) {
    throw new Error("Can't create todo");
  }
};

export interface UpdateToDoInterface {
  priority?: boolean;
  status?: boolean;
  title?: string;
}

export const updateToDoApi = async (id: string, data: UpdateToDoInterface) => {
  try {
    const response = await axiosInstance.patch(backendRoutes.todos + id + '/', data);
    return response.data;
  } catch (error) {
    throw new Error("Can't update todo");
  }
};

export const toggleCompleted = async (id: string) => {
  try {
    const response = await axiosInstance.patch(backendRoutes.todos + id + '/toggle-completed/');
    return response.data
  } catch (error){
    throw new Error("Can't toggle completed todo")
  }
}

export const deleteToDoApi = async (id: string) => {
  try {
    await axiosInstance.delete(backendRoutes.todos + id + '/');
  } catch (error) {
    throw new Error("Can't delete todo");
  }
};
