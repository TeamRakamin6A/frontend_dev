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
    }

}