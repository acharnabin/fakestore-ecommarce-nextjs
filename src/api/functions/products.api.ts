
// ONLY PRODUCT RELATED API CALLS

import axiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"

export const getProductList=async()=>{
    const res=await axiosInstance.get(endpoints.products.list);

    return res.data
}

export const getProductDetails=async(id:number)=>{
    const res=await axiosInstance.get(endpoints.products.details(id));

    return res.data
}