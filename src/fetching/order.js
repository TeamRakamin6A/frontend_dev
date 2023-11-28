import instance from "../lib/axios";

// Add Order     <<<< 
export async function createOrder(invoice, warehouse_id, customer_id, status, items) {
    try {
        const response = await instance.post('/orders', { invoice, warehouse_id, customer_id, status, items });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

// Update Order
export async function updateOrder(id, status) {
    try {
        await instance.put(`/orders/${id}`, { status });
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
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

// Delete Order 
export async function deleteOrder(id) {
    try {
        
        await instance.delete(`/orders/${id}`);
        
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}