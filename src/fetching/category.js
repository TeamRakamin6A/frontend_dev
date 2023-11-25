import instance from "../lib/axios";

export async function getAllCategories() {
    try {

        const data = await instance({
            url: "/categories",
            method: "GET",

        });

        const response = data.data;
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}