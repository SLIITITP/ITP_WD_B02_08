/*import React from 'react';
import { Form , message } from 'antd';
import {Link} from 'react-router-dom';
import { loginUser } from '../../../apicalls/users';


export default function Login() {


  const onFinish = async(values) =>{
    try {
      const response = await loginUser(values);
      if(response.success){
          message.success(response.message);
          localStorage.setItem("token" , response.data);
          window.location.href = "/exams";
      }else{
          message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  return (
    <div className='flex justify-center item-center h-screen w-screen'>
      <div className="card w-400 p-3">
        <div className="flex flex-col">
          <h1 className="text-2xl">Login</h1>
          <div className="divider"></div>
          <Form layout='vertical' className='mt-2' onFinish={onFinish}>
            <Form.Item name='email' label='Email'>
              <input className='einput' type='text' placeholder='Email'/>
            </Form.Item>
            <Form.Item name='password' label='Password'>
              <input className='einput' type='text' placeholder='Password'/>
            </Form.Item>
            <button type='submit' className='primary-contained-btn mt-2 w-100'>Login</button>
            <Link to="/register" className='text-center mt-2'>Register</Link> 
          </Form>
        </div>
      </div>
    </div>
  )
}*/

import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";

function Login() {
  const dispatch = useDispatch(); //for loader
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading()); //showing loader
      const response = await loginUser(values);
      dispatch(HideLoading()); //hide loader
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        localStorage.setItem("userName" , values.name );
        window.location.href = "/exams";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen bg-primary">
      <div className="card w-400 p-3 bg-white">
        <div className="flex flex-col">
          <div className="flex">
            <h1 className="text-2xl">Quiz Portal <i class="ri-login-circle-line"></i></h1>
            
          </div>
          <div className="divider"></div>
          <Form layout="vertical" className="mt-2" onFinish={onFinish}>
            <Form.Item name="email" label="Email">
              <input type="text" />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <input type="password" />
            </Form.Item>

            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="primary-contained-btn mt-2 w-100"
              >
                Login
              </button>
              <Link to="/register" className="underline">
                Not a member? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
