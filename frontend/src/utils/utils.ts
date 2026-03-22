import { ACCESS_TOKEN } from "@/constants"

export const getToken = () => {
    return  localStorage.getItem(ACCESS_TOKEN)
}