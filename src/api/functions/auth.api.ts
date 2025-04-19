import axiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"

export const loginFunction=async(data:{username:string;password:string})=>{
    const res=await axiosInstance.post(endpoints.auth.login,data)
    return res.data
}