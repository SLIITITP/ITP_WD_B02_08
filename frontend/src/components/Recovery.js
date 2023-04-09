import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../images/profile.png';
import styles from '../stylesheets/Username.module.css'
import { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../validations/validate';



export default function Recovery() {

    const formik = useFormik({
        initialValues : {
           password : ''
        },
        validate:passwordValidate,                 //validate the input text box and return value
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
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recoverr password
            </span>
          </div>
          <form className='pt-20'>
            
            <div className="textbox flex flex-col items-center gap-6">

              <div className='input text-center'>
                <span className='py-4 text-sm text-left text-gray-500'>
                Ener 6 digit OTP sent to your email address
                </span>
                <input className={styles.textbox} type="password" placeholder='OTP'/>

              </div>

              
              
              <button className={styles.btn} type='submit'>Log in</button>
            </div>
            <div className="text-center py-2 px-3.5">
              <span className='text-gray-500'>Can't get OTP <button className='text-red-500' to='/reset'>Resend</button></span>
            </div>
          </form>
        </div>

      </div>
    </div>
    </div>
  )
}