import axios from "axios";

const Token = localStorage.getItem("token");

const api = "http://localhost:5002/";

const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: `${api}/`,
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "x-token": Token,
        },
    });
};

export const instance = createAxiosInstance(Token);

export const updateToken = (newToken) => {
    instance.defaults.headers["Authorization"] = `Bearer ${newToken.trim()}`;
    instance.defaults.headers["x-token"] = newToken;
};

export default instance;
