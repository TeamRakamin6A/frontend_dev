import instance from "../lib/axios";


async function createSupplyOrder(data) {
    try {
        const response = await instance.post("/supplyorders", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getAllSupplyOrders(page, limit, query, warehouseId, supplierId, status) {
    try {
        const response = await instance.get("/supplyorders", {
            params: { page, limit, q: query, warehouseId, supplierId, status },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getSupplyOrderDetail(id) {
    try {
        const response = await instance.get(`/supplyorders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateSupplyOrder(id, status) {
    try {
        const response = await instance.put(`/supplyorders/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteSupplyOrder(id) {
    try {
        const response = await instance.delete(`/supplyorders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

export {
    createSupplyOrder,
    getAllSupplyOrders,
    getSupplyOrderDetail,
    updateSupplyOrder,
    deleteSupplyOrder
};