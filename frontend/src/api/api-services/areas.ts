import { AreaInterface } from "@/interfaces/interfaces";
import axiosInstance from "../axios";

import backendRoutes from "../apiRoutes";

export const getAllAreas = async () => {
  try {
    const response = await axiosInstance.get(backendRoutes.areas + "?vegetables=true");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't fetch areas from the server");
  }
};

// interface dataInterface {
//   name: string;
//   surface: number;
//   sowing_area: boolean;
// }

export const createAreaApi = async (data: Omit<AreaInterface, "id">) => {
  try {
    const response = await axiosInstance.post(backendRoutes.areas, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occured when creating the area");
  }
};

export const deleteAreaApi = async (id: string) => {
  try {
    await axiosInstance.delete(backendRoutes.areas + id + "/");
  } catch (error) {
    console.error(error);
  }
};

export const updateAreaApi = async (id: string, data, vegetables) => {
  try {
    const response = await axiosInstance.patch(backendRoutes.areas + id + "/", data);
    response.data.vegetables = vegetables
    return response.data
  } catch (error) {
    console.error(error);
  }
};
