import axiosInstance from "axios";

export const registerUser = async (payload) =>{
    try {
        const response = await axiosInstance.post('/api/users/register' , payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const loginUser = async (payload) =>{
    try {
        const response = await axiosInstance.post('/api/users/login' , payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
