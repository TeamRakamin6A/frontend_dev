import instance from "../lib/axios";

export async function getAllItems(q, categoryIds) {
    try {
        const data = await instance({
            url: "/items",
            method: "GET",
            params: {
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
