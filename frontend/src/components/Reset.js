import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../images/profile.png';
import styles from '../stylesheets/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../validations/validate';
import { resetPasswordValidation } from '../validations/validate';



export default function Password() {

    const formik = useFormik({
        initialValues : {
           password : '',
           confirm_pwd: ''
        },
        validate:resetPasswordValidation,                 //validate the input text box and return value
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values =>{                //validate only after submitting button
            console.log(values)
        }            
    })

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