import axios from "axios";

export const axiosService = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}`,
});

axiosService.interceptors.request.use((response) => {
    return response;
    },
    (error) => {
        console.log('Request error: ', error.code, error.request.responseURL, error);
        throw error;
    }    
);

window.axiosService = axiosService;
