import axios from "axios";
export const instance = axios.create({
    baseURL: process.env.REACT_APP_FREON,
    headers: {
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
    // withCredentials: true,
});

//인스턴스 request header
instance.interceptors.request.use((config) => {
    if (config.headers === undefined) return;
    const accessToken = localStorage.getItem("accessToken");
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
});

