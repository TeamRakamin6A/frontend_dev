import instance from "../lib/axios";

export async function login(params) {
    try {
        const { emailOrUsername, password } = params
        const response = await instance({
            url: '/users/login',
            method: 'POST',
            data: {
                emailOrUsername, password
            }
        })

        const data = response.data;
        localStorage.setItem("token", data.accessToken)

        return data
    } catch (error) {
        console.log(error);
    }
}