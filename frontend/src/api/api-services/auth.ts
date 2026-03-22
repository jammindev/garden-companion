import axiosInstance from "../axios";
import backendRoutes from "../apiRoutes";

const testToken = async () => {
  const accessToken = localStorage.getItem("JWTGP");
  if (!accessToken) {
    return "unknownUser";
  }
  try {
    const response = await axiosInstance.post(backendRoutes.verifyToken, {token: accessToken});
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error("Error when testing the token");
  }
};

export const verifyAccessToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(backendRoutes.verifyToken, { token });
    return response.status === 200;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

export default testToken;
