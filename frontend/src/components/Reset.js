import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../images/profile.png';
import styles from '../stylesheets/Username.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../validations/validate';
import { resetPasswordValidation } from '../validations/validate';
import { resetPassword } from '../apicalls/helper';
import { useAuthStore } from '../redux/store1';
import { useNavigate , Navigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';

export default function Reset() {

    const {username} = useAuthStore(state=> state.auth);
    const navigate = useNavigate();
    const [{isLoading , apiData , status, serverError}] = useFetch('createResetSession')

     

    const formik = useFormik({
        initialValues : {
           password : '',
           confirm_pwd: ''
        },
        validate:resetPasswordValidation,                 //validate the input text box and return value
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values =>{                //validate only after submitting button
           
        let resetPromise = resetPassword({ username,password: values.password })

        toast.promise(resetPromise,{
          loading: 'updating',
          success: <b> Reset Successfully</b>,
          error:<b>could not reset</b>
        });

        resetPassword.then(function() {navigate('/password')})

        }            
    })

       if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
       if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
      if(status && status !== 201) return <Navigate to={'/password'} replace={true} ></Navigate>


  return (
   <div className={styles.body}>      
    <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen' >
        <div className={styles.glass} >
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset Password</h4>
            <span className='py-20 text-xl w-2/3 text-center text-gray-500'>
              Enter New Password 
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='New Password'/>
            <input {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} type="password" placeholder='Re-type Password'/>

              <button className={styles.btn} type='submit'>Reset</button>
            </div>
           
          </form>
        </div>

      </div>
    </div>
    </div>
  )
}