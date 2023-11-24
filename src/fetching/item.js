import instance from "../lib/axios";

export async function getAllItems(page, limit, q, categoryIds) {
    try {
        if (q || categoryIds) {
            page = page - 1
        }

        const data = await instance({
            url: "/items",
            method: "GET",
            params: {
                page: page,
                limit: limit,
                q: q,
                'category_ids[]': categoryIds ? categoryIds.split(',') : []
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
        const response = data.data;
        return response;
    } catch (error) {
        console.log(error);
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
        const file = {
            image: imageFile
        }
        const data = await instance({
            url: `/items/upload/${id}`,
            method: "PUT",
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: file,
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

export async function deleteItem(id, dataItems) {
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