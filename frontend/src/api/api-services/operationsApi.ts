import axiosInstance from "../axios";

export const getAllOperations = async () => {
    try {
      const response = await axiosInstance.get("operations/");
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Can't fetch operations from the server");
    }
  };

export const deleteOperation = async (id: string) => {
  try {
    await axiosInstance.delete(`operations/${id}/`);
  } catch (error) {
    console.error(error);
    throw new Error("Can't fetch operations from the server");
  }
}