import axios from "axios";

const API_URL = "http://localhost:7000";
const instance = axios.create({ baseURL: API_URL });

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

async function createSupplyOrder(data) {
    try {
        const response = await instance.post("api/supplyorders", data);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getAllSupplyOrders(page, limit, query, warehouseId, supplierId, status) {
    try {
        const response = await instance.get("api/supplyorders", {
            params: { page, limit, q: query, warehouseId, supplierId, status },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function getSupplyOrderDetail(id) {
    try {
        const response = await instance.get(`api/supplyorders/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function updateSupplyOrder(id, status) {
    try {
        const response = await instance.put(`api/supplyorders/${id}`, { status });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}

async function deleteSupplyOrder(id) {
    try {
        const response = await instance.delete(`api/supplyorders/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong");
    }
}


//Untuk Mencoba Fitur Filter dan Create

//SUPPLIERS
const getAllSuppliers = async (page, limit, company_nameFilter) => {
    try {
        const response = await instance.get(`api/suppliers`, {
            params: {
                page,
                limit,
                q: company_nameFilter,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Something went wrong');
    }
};

async function getSupplierDetail(supplierId) {
    try {
        const response = await instance.get(`api/suppliers/${supplierId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong while fetching supplier details");
    }
}



//WAREHOUSE
async function getAllWarehouses(page, limit, query, low_stock) {
    try {
        const response = await instance.get("api/warehouses", {
            params: { page, limit, q: query, low_stock },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response.data.message || "Something went wrong while fetching warehouses"
        );
    }
}

async function getWarehouseDetail(warehouseId) {
    try {
        const response = await instance.get(`api/warehouses/${warehouseId}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || "Something went wrong while fetching warehouse details");
    }
}

async function getItems(page, limit, query, low_stock) {
    try {
        const response = await instance.get("api/items", {
            params: { page, limit, q: query, low_stock },
        });
        return response.data;
    } catch (error) {
        throw new Error(
            error.response.data.message || "Something went wrong while fetching items"
        );
    }
}

export {
    createSupplyOrder,
    getAllSupplyOrders,
    getSupplyOrderDetail,
    updateSupplyOrder,
    deleteSupplyOrder,

    getAllSuppliers,
    getSupplierDetail,

    getAllWarehouses,
    getWarehouseDetail,
    getItems
};
