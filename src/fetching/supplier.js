import instance from "../lib/axios";

export async function addSupplier(company_name, address, email, zip_code) {
    try {
        const response = await instance.post('/suppliers', { company_name, address, email, zip_code });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function getAllSuppliers(page, limit, nameFilter) {
    try {
        const response = await instance.get(`/suppliers?page=${page}&limit=${limit}&name=${nameFilter}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function getSupplierById(id) {
    try {
        const response = await instance.get(`/suppliers/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateSupplier(id, company_name, address, email, zip_code) {
    try {
        const response = await instance.put(`/suppliers/${id}`, { company_name, address, email, zip_code });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteSupplier(id) {
    try {
        const response = await instance.delete(`/suppliers/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}