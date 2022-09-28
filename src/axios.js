import axios from "axios"

const instance = axios.create({
    baseURL: "https://reactblogv2.herokuapp.com"
})
// "http://localhost:5000"
//
instance.interceptors.request.use(config => {
    config.headers.Authorization = window.localStorage.getItem("token")
    return config
})
export default instance