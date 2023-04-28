import axios from "axios";
import jwt_decode from 'jwt-decode'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}


/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

export async function authenticateTeacher(username){
    console.log(username)
    try {
        return await axios.post('/api/authenticateTeacher', { username })
    } catch (error) {
        return { error : "Teachername doesn't exist...!"}
    }
}




/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}


/** register user function */
export async function registerUser1(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/registration`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}


/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

export async function verifyPasswordTeacher({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/teacherLogin', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}


/** update user profile function */
export async function updateUser(response,id){
    try {
        
        const token = await localStorage.getItem('token');
        console.log(token)
        const data = await axios.put('/api/updateuser?id='+id, response, { headers : { "Authorization" : `Bearer ${token}`}});
        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}


/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}
 

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}


/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}

export async function getProfileTeacher(userName){
    
        try {
        
            const { data, status } = await axios.get(`/api/teacher/${userName}`);
            //!query ? await axios.get(`/api/user/${username}`) :
            return Promise.resolve({ data, status})

        } catch (error) {
            return Promise.reject({ error })
        }
   
}

export async function getProfile(userName){
    
    try {
    
        const { data, status } = await axios.get(`/api/user/${userName}`);
        //!query ? await axios.get(`/api/user/${username}`) :
        return Promise.resolve({ data, status})

    } catch (error) {
        return Promise.reject({ error })
    }

}

/** delete user profile function */
export async function deleteUser(id) {
    try {
      const token = await localStorage.getItem('token');
      console.log(id);
      const data = await axios.delete(`/api/deleteuser?id=${id}`, { headers: { 'Authorization': `Bearer ${token}` } });
  
      return Promise.resolve({ data });
    } catch (error) {
      return Promise.reject({ error: "Couldn't Delete User...!" });
    }
  }


//===========================================================================================================


export async function updateTeacher(response,id){
    try {
        
        const token = await localStorage.getItem('token');
        console.log(token)
        const data = await axios.put('/api/updateteacher?id='+id, response, { headers : { "Authorization" : `Bearer ${token}`}});

        return Promise.resolve({ data })
    } catch (error) {
        return Promise.reject({ error : "Couldn't Update Profile...!"})
    }
}



export async function registerTeacher(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/registerTeacher`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

