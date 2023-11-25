import { FaRegHospital } from "react-icons/fa";
import instance from "../lib/axios";

// Get All Order  
export async function getAllWarehouses(page, limit, nameFilter) {
    try {
        const response = await instance.get(`/warehouses?page=${page}&limit=${limit}&name=${nameFilter}`);
        const data = response.data;
        return data;    
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function createWarehouse(title, address) {
    try {
       const response = await instance.post("/warehouses", { title, address});
       const data = response.data;
       return data;

    } catch (error) {
        console.error();
        throw error;
    }
}

// Update Warehouse
export async function updateWarehouse(id, title, address) {
    try {
        await instance.put(`/warehouses/${id}`, { title, address });
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}



// Get Warehouse Detail.
export async function getWarehouseById(id) {
    try {
        const data = await instance({
            url: `/warehouses/${id}`,
            method: "GET",
        });
        console.log(data);
        const response = data.Items.Item_Warehouse;
        return response;

    } catch (error) {
        console.log(error);
    }
}


// Delete Order 
export async function deleteWarehouseById(id) {
    try {
        
        await instance.delete(`/warehouses/${id}`);
        
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}
