import axios from "axios";
import { BASE_URL } from "../endpoints/endpoints";


const axiosInstance=axios.create({
    baseURL:BASE_URL
})

export default axiosInstance