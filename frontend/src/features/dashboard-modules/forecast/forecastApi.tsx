import axiosInstance from "../../../api/axios";

export const getForecast = async (lat: number, lng: number) => {
  try {
    const response = await axiosInstance.get(
      `/forecast/?lat=${lat}&lng=${lng}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Can't fetch forecast from the server");
  }
};
