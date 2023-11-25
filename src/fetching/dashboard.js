import instance from "../lib/axios";


export async function getDataDashboard() {
    try {
        const response = await instance({
            method: 'get',
            url: '/dashboards',
        })

        const data = response.data
        return data
    } catch (error) {
        console.log(error);
    }

}