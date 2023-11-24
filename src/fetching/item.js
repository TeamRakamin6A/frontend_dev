import instance from "../lib/axios";

export async function getAllItems(page, limit, q, categoryIds) {
    try {
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
