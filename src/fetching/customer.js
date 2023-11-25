// customerApi.js
import instance from "../lib/axios";

export async function addCustomer(name, address, phone_number, email) {
    try {
        const response = await instance.post('/customers', { name, address, phone_number, email });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function getAllCustomers(page, limit, nameFilter) {
    try {
        const response = await instance.get(`/customers?page=${page}&limit=${limit}&name=${nameFilter}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function getCustomerById(id) {
    try {
        const response = await instance.get(`/customers/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateCustomer(id, name, address, phone_number, email) {
    try {
        const response = await instance.put(`/customers/${id}`, { name, address, phone_number, email });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteCustomer(id) {
    try {
        
        await instance.delete(`/customers/${id}`);
        
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}
