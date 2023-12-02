import instance from "../lib/axios";

// Create order
export async function createOrder(data) {
    try {
        const response = await instance.post("/orders", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

// Update Order
export async function updateOrder(id, status) {
    try {
        const response = await instance.put(`/orders/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

// Get All Order    
export async function getAllOrder(page, limit, query, warehouseId, customerId, status) {
    try {
        const response = await instance.get("/orders", {
            params: { page, limit, q: query, warehouseId, customerId, status },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

// Get Order Detail
export async function getOrderById(id) {
    try {
        const response = await instance.get(`/orders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

// Delete Order 
export async function deleteOrder(id) {
    try {

        const response = await instance.delete(`/orders/${id}`);
        return response.data

    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}