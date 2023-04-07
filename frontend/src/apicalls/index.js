/*import axios from 'axios';

const axiosInstance = axios.create({
    headers:{
        Authorization : `Bearer ${localStorage.getItem('token')}`
        
    }
});
console.log(Authorization);

export default axiosInstance;*/

import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
         Authorization : `Bearer ${localStorage.getItem('token')}`
    }
});

export default axiosInstance;