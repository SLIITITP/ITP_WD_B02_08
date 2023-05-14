import React, { useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../images/profile.png';
import styles from '../stylesheets/Username.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../validations/validate';
import useFetch from '../hooks/fetch.hook';
import {useAuthStore} from '../redux/store1';
import {verifyPassword, getProfile} from '../apicalls/helper'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { loginUser } from "../apicalls/users";
import { message } from 'antd';

export default function Password() {

 const navigate = useNavigate()
 //const {username}=useAuthStore(state => state.auth)
 // const [{isLoading , apiData , serverError}] = useFetch(`/user/${username}`)
//console.log(apiData)
const [apiData,setApiData] = useState({})
const [file , setFile] = useState();
const {username}=useAuthStore(state => state.auth)
const [error,setErrorLogin] = useState('');
// const [showPassword, setShowPassword] = useState(false);

// const handleTogglePassword = () => {
//   setShowPassword(!showPassword);
// };

useEffect(()=>{
  console.log(username);
   getProfile(username).then((results) =>{
    let apiData = results.data;
     setApiData({firstName:apiData?.firstName || '',
     lastName:apiData?.lastName || '',
     email :apiData?.email || '', 
     mobile:apiData?.mobile || '',
     address:apiData?.address || '',
     profile:apiData?.profile || '',
    // id:apiData._id
    })
   })
 
},[])


    const formik = useFormik({
        initialValues : {
           password : '',
           email: ''
           //profile:apiData?.profile || ''
        }, 
       
        validate:passwordValidate,                 //validate the input text box and return value
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values =>{                  //validate only after submitting button
          toast.loading("Loading......")          
          let loginPromise = verifyPassword({username , password: values.password})
          const response = await loginUser(values);
          if (response.success) {
           // message.success(response.message);
            localStorage.setItem("token1", response.data);
            //localStorage.setItem("userName" , values.name );
            // window.location.href = "/profile";
          } else {
           // message.error(response.message);
          }
          console.log(loginPromise)
          // toast.promise(loginPromise ,{
          //   loading: 'Cheking...',
          //   success: <b>Login Successfully...!</b>,
          //   error:<b>{error}</b>
          // });
          
          
          loginPromise.then(res => {
            toast.dismiss() 
            console.log(res);
             let {token} = res.data;
             localStorage.setItem('token',token)
             toast.success("Login Successfully...!")      
             navigate('/profile')
          })
          .catch(error => {
            toast.dismiss() 
            console.log(error.error.response.data);
            setErrorLogin(error.error.response.data.error)
            toast.error(error.error.response.data.error)
          });
          
        }            
    })

    const onFinish = async (values) => {
      try {
        // dispatch(ShowLoading()); //showing loader
        const response = await loginUser(values);
        // dispatch(HideLoading()); //hide loader
        if (response.success) {
          //message.success(response.message);
          localStorage.setItem("token", response.data);
          localStorage.setItem("userName" , values.name );
          window.location.href = "/profile";
        } else {
          //message.error(response.message);
        }
      } catch (error) {
       
        //message.error(error.message);
      }
    };


    useEffect(() => {
      formik.setValues({
        ...formik.values,
        email: apiData.email || '',
      })
    }, [apiData.email])
  


   // if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
   // if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
   <div className={styles.body}>      
    <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen' >
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Hello {username}</h4>
             { /* {apiData?.firstName || apiData?.username} */}
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore more by connecting with us
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit} onFinish={onFinish}>
            <div className='profile flex justify-center py-4'>
               <img src={apiData?.profile || avatar}  className={styles.profile_img} alt='avatar'></img> 
               
               {/* src={apiData?.profile || avatar} */}
            </div>
            <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps("email")} className={styles.textbox} type='email' placeholder='Email' name="email"/>
            <input {...formik.getFieldProps('password')} className={styles.textbox} type='password' placeholder='Password' name="password"/>
    
      
              <button className={styles.btn} type='submit'>Log in</button>
            </div>
            <div className="text-center py-2 px-3.5">
              <span className='text-gray-500'>Forgot password <Link className='text-red-500' to='/recovery'>Recover Now</Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>
    </div>
  )
}
