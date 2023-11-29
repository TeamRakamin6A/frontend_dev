import { FaRegHospital } from "react-icons/fa";
import instance from "../lib/axios";

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
        const response = await instance.post("/warehouses", { title, address });
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
        const response = await instance({
            url: `/warehouses/${id}`,
            method: "GET",
        });
        const data = response.data.data

        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}


export async function deleteWarehouseById(id) {
    try {

        await instance.delete(`/warehouses/${id}`);

    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateQuantity(params) {
    try {
        const { id, item_id, quantity } = params;
        const response = await instance({
            url: `/warehouses/quantities/${id}`,
            method: "PUT",
            data: {
                item_id,
                quantity
            }
        })

        const data = response.data;

        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}


export async function moveQuantityToWarehouse(params) {
    try {
        const response = await instance({
            url: "/warehouses/moves",
            method: "POST",
            data: params
        })
        const data = response.data;

        return data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export async function addItemToWarehouse(params) {
    try {
        const { id, item_id, quantity } = params;
        const response = await instance({
            url: `/warehouses/addItem/${id}`,
            method: "POST",
            data: {
                item_id,
                quantity
            }
        })

        const data = response.data;

        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}