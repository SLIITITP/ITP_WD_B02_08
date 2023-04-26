const { default: axiosInstance } = require(".");

export const tregisterUser = async (payload) => {
    console.log(payload);
    try {
        const response = await axiosInstance.post('/api/users/tregister', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const tloginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/tlogin', payload);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}

export const tgetUserInfo = async () => {
    try {
        const response = await axiosInstance.post('/api/users/tget-user-info');
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}
