import { ActionInterface } from "@/interfaces/interfaces";
import axiosInstance from "../axios";

export const getAllActionsApi = async () => {
    try {
        const response = await axiosInstance.get("/api/v1/action/")
        return response.data
    } catch (error) {
        throw new Error("Can't fetch actions from the server")
    }
}

export const createActionApi = async (data: ActionInterface) => {
    try {
        const response = await axiosInstance.post("/api/v1/action/create", data)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error ("An error occured when creating the action")
    }
}

export const deleteActionApi = async (id: string) => {
    try  {
        const response = await axiosInstance.delete(`/api/v1/action/${id}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error ("An error occured when deleting the action")
    }

}

export const updateActionApi = async (id: string, data:ActionInterface) => {
    try {
        const response = await axiosInstance.put(`/api/v1/action/${id}`, data)
        return response.data
    } catch (error) {
        console.error(error)
        throw new Error("An error occured when updating the action")
    }
}
