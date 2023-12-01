import instance from "../lib/axios";

export async function getAllItems(page, limit, q, categoryIds) {
    try {
        const data = await instance({
            url: "/items",
            method: "GET",
            params: {
                page: categoryIds.length > 0 ? page - 1 : page,
                limit: limit,
                q: q,
                category_ids: categoryIds
            },
        });

        const response = data.data;
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getItemByID(id) {
    try {
        const data = await instance({
            url: `/items/${id}`,
            method: "GET",
        });
        console.log(data);
        const response = data.data.data_item;
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }

}

export async function createItem(dataItems) {
    try {
        const data = await instance({
            url: "/items",
            method: "POST",
            data: dataItems
        })

        const response = data.data;
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function uploadImage(id, imageFile) {
    try {
        const data = await instance({
            url: `/items/upload/${id}`,
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: imageFile,
        })

        const response = data.data;
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function updateItem(id, dataItems) {
    try {
        const data = await instance({
            url: `/items/${id}`,
            method: "PUT",
            data: dataItems,
        })

        const response = data.data;
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }

}

export async function deleteItem(id) {
    try {
        const data = await instance({
            url: `/items/${id}`,
            method: "DELETE",
        })

        const response = data.data;
        return response;
    } catch (error) {
        console.log(error)
        throw error
    }

}