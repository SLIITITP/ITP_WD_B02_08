import React, { useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import avatar from '../images/profile.png';
import styles from '../stylesheets/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../validations/validate';
import {useAuthStore} from '../redux/store1';
//import { passwordValidate } from '../validations/validate';



export default function Username() {

  const navigate = useNavigate();
 const setUsername = useAuthStore(state => state.setUsername)  //set the value of the username state variable in the global state store.


 useEffect(()=> {
  //console.log(Username)
 })

    const formik = useFormik({
        initialValues : {
            username : ''
        },
        validate:usernameValidate,                 //validate the input text box and return value
        validateOnBlur: false,                      //validation will only be triggered when the form is submitted.
        validateOnChange: false,
        onSubmit : async values =>{                //validate only after submitting button
            setUsername(values.username);
            localStorage.setItem("userName",values.username)
            navigate('/password')
        }            
    })

  return (
   <div className={styles.body} >      
    <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen' >
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Thilina Login</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore more by connecting with us ...
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className='profile flex justify-center py-4'>
               <img src={avatar} className={styles.profile_img} alt='avatar'></img> 
            </div>
            <div className="textbox flex flex-col items-center gap-6">
              <input {...formik.getFieldProps('username')} className={styles.textbox} type='text' placeholder='Username'></input>
              {/* <input  className={styles.textbox} type='text' placeholder='password'></input> */}
              <button className={styles.btn} type='submit'>Log in</button>
            </div>
            <div className="text-center py-2 px-3.5">
              <span className='text-gray-500'>Not a Member <Link className='text-red-500' to='/registers'>Register Now</Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>
    </div>
  )
}
