import axios from "axios";

export const axiosClassic = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
});