import { SeedlingInterface } from "@/interfaces/interfaces";
import axiosInstance from "../axios";
import backendRoutes from "../apiRoutes";

export const getAllSeedlings = async () => {
    try {
        const response = await axiosInstance.get(backendRoutes.seedlings)
        return response.data
    } catch (error) {
        throw new Error("Can't fetch seedlings  from the server")
    }
}

export const createSeedling = async (data: Omit<SeedlingInterface, "seedling_id">) => {
    try {
        const response = await axiosInstance.post(backendRoutes.seedlings, data)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error ("An error occured when creating the seedling")
    }
}

export const deleteSeedling = async (id: string) => {
    try  {
        const response = await axiosInstance.delete(backendRoutes.seedlings + id + "/")
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error ("An error occured when deleting the seedling")
    }

}

export const updateSeedling = async (id: string, data:object) => {
    try {
        const response = await axiosInstance.patch(backendRoutes.seedlings + id + "/", data)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error("An error occured when  updating the seedling")
    }
}