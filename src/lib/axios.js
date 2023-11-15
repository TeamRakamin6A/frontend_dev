import axios from "axios"

// eslint-disable-next-line no-undef
// const BASE_URL = process.env.REACT_APP_BASE_URL

const instance = axios.create({
    baseURL: 'http://localhost:7000/api'
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance