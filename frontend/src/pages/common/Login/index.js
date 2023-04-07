import React from 'react';
import { Form , message } from 'antd';
import {Link} from 'react-router-dom';
import { loginUser } from '../../../apicalls/users';


export default function Login() {


  const onFinish = async(values) =>{
    try {
      const response = await loginUser(values);
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
}
