
// ONLY PRODUCT RELATED API CALLS

import { TProductSchema } from "@/typescript/products.interface";
import axiosInstance from "../axios-instance/axiosInstance"
import { endpoints } from "../endpoints/endpoints"

export const getProductList=async()=>{
    const res=await axiosInstance.get<TProductSchema['IProductResponse']>(endpoints.products.list);

    return res.data
}

export const getProductDetails=async(id:number)=>{
    const res=await axiosInstance.get<TProductSchema['IProductObject']>(endpoints.products.details(id));

    return res.data
}

export const getCategoryList=async()=>{
    const res=await axiosInstance.get<TProductSchema['ICategoryListResponse']>(endpoints.products.category);

    return res?.data
}

export const getCategoryProductList=async(cat:string)=>{
    const res=await axiosInstance.get<TProductSchema['IProductResponse']>(endpoints.products.categoryProducts(cat));

    return res?.data
}