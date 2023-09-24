import axios from "axios"

export const loginApi = (data) => {
    return axios.post(`/api/auth/login`, data)
}

export const SignupApi = (data) => {
    return axios.post(`/api/auth/signup`, data)
}