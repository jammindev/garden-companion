import { VegetableInterface } from "@/interfaces/interfaces";
import axiosInstance from "../axios";


export const createVegetableApi = async (data: VegetableInterface) => {
  try {
    const response = await axiosInstance.post(
      "/api/v1/vegetable_manager/create",
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't create vegetable");
  }
};

export const getAllVegetables = async () => {
  try {
    const response = await axiosInstance.get("vegetables/");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't fetch vegetables from the server");
  }
};

export  const deleteVegetableApi = async (id: number) => {
  try {
    const response = await axiosInstance.delete(`vegetables/${id}/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't delete vegetable");
  }
}
