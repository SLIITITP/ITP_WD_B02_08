import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../images/profile.png';
import styles from '../stylesheets/Username.module.css'
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import {registerValdation } from '../validations/validate';
import convertToBase64 from '../validations/convert';
import { registerUser1 } from '../apicalls/helper';
import { registerUser } from '../apicalls/users'
import { message } from 'antd';
import alanBtn from '@alan-ai/alan-sdk-web';


export default function Register() {

  const navigate = useNavigate();

    const [file , setFile] = useState()
    // const ALAN_KEY = `9fc60efc76173484ba7004ef5b5618262e956eca572e1d8b807a3e2338fdd0dc/stage`
    const ALAN_KEY = '046117989bcbdb7e620544158647473c2e956eca572e1d8b807a3e2338fdd0dc/stage'
    const [alanInstance, setAlanInstance] = useState(null);
   
    const formik = useFormik({
        initialValues : {
           email : '',
           username: '',
           password: '',
           grade: ''
        },
        validate:registerValdation,                 //validate the input text box and return value
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit : async values =>{                 //validate only after submitting button
            values = await Object.assign(values , {profile : file || ''})
            console.log(values);
           let registerPromise = registerUser1(values)
           const response = await registerUser(values)
            toast.promise(registerPromise,{
              loading: 'Creating...',
              success: <b>Register Successfully...!</b>,
              error: <b>Could not Register</b>
            })

            registerPromise.then(function(){navigate('/plogin')});
        }            
    })

    useEffect(() => {
     console.log("text");
      alanBtn({
        key: ALAN_KEY,
        onCommand: (commandData) => {
          console.log(commandData)
          if (commandData.command === 'email') {
            formik.setFieldValue("email",commandData.data);
            // alanInstance.playText(`Setting email to ${commandData.data}`);
            
          } else if (commandData.command === 'username') {
            formik.setFieldValue('username', commandData.data);
          }
        },
      });
      // setAlanInstance(alan);
      // formik.setFieldValue("email", "Damish");
      
    }, [alanBtn]);

    const handleEmailChange = (e, alanInstance) => {
      console.log(e);
      formik.handleChange(e);
       alanInstance.playText(`Setting email to ${e.target.value}`);
      
    };
    
    const handleUsernameChange = (e, alanInstance) => {
      formik.handleChange(e);
      alanInstance.playText(`Setting username to ${e.target.value}`);
    };

  //cretae file upload handler
  const onUpload = async e =>{
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }  

  const onFinish = async(values) =>{
    try {
        
        const response = await registerUser(values)
        
        if(response.success){
            message.success(response.message);
        }else{
            message.error(response.message);
        }
    } catch (error) {
        
        message.error(error.message);
    }
   }

  return (
   <div className={styles.body}>      
    <div className="container mx-auto">
      

            <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen' >
        <div className={styles.glass} style={{height: "85%"}}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'> Thilina Registration</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Welcome to Thilina Educational Institute
            </span>
          </div>
          <form className='py-1' onSubmit={formik.handleSubmit} onFinish={onFinish} >
            <div className='profile flex justify-center py-4'>
              <label htmlFor='profile'>
              <img src={file ||avatar} className={styles.profile_img} alt='avatar'></img>
              </label>

              <input onChange={onUpload} type='file' id='profile' name='profile'></input>
          
            </div>
            <div className="textbox flex flex-col items-center gap-6">
            <input {...formik.getFieldProps('email')} className={styles.textbox} type="email" placeholder='Email*' id='email' onChange={(e) => handleEmailChange(e, alanInstance)}/>
            <input {...formik.getFieldProps('username')} className={styles.textbox} type="text" placeholder='Username*' id='name' onChange={(e) => handleUsernameChange(e, alanInstance)}/>
            <input {...formik.getFieldProps('password')} className={styles.textbox} type="password" placeholder='Password*'/>
            <select {...formik.getFieldProps('grade')} className={styles.textbox} >
              <option value="" >Select Grade</option>
              <option value="6" >Grade 6</option>
              <option value="7" >Grade 7</option>
              <option value="8" >Grade 8</option>
              <option value="9" >Grade 9</option>
              <option value="10" >Grade 10</option>
              <option value="11" >Grade 11</option>
            </select>
              
              <button className={styles.btn} type='submit'>Register</button>
            </div>
            <div className="text-center py-2 px-3.5">
              <span className='text-gray-500'>Already Register? <Link className='text-red-500' to='/plogin'>Login now</Link></span>
            </div>
          </form>
        </div>

      </div>
    </div>
    </div>
  )
}
