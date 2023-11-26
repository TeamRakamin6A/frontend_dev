import instance from "../lib/axios";

export async function addCategorie(title) {
    try {
        const response = await instance.post('/categories', { title });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function getAllCategories(page, limit, nameFilter) {
    try {

        const response = await instance.get(`/categories?page=${page}&limit=${limit}&q=${nameFilter}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function getCategorieById(id) {
    try {
        const response = await instance.get(`/categories/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function updateCategorie(id, title) {
    try {
        const response = await instance.put(`/categories/${id}`, { title });
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}

export async function deleteCategorie(id) {
    try {
        const response = await instance.delete(`/categories/${id}`);
        const data = response.data;
        return data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Error Not Found');
    }
}