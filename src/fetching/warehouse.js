import { FaRegHospital } from "react-icons/fa";
import instance from "../lib/axios";

// Get All Order    <<<< 
export async function getAllWarehouses(page, limit, nameFilter) {
    try {
        const response = await instance.get(`/warehouses?page=${page}&limit=${limit}&name=${nameFilter}`);
        const data = response.data;
        return data;    
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}