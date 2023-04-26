import React from 'react'
import { Form, message } from 'antd'
import {Link} from 'react-router-dom'
import { tregisterUser } from '../../../apicalls/teachers'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice'

export default function TeachersReg() {
    const dispatch = useDispatch(); //for loader
   const onFinish = async(values) =>{
    try {
        dispatch(ShowLoading()); //showing loader
        const response = await tregisterUser(values)
        dispatch(HideLoading()); //hide loader
        if(response.success){
            message.success(response.message);
        }else{
            message.error(response.message);
        }
    } catch (error) {
        dispatch(HideLoading()); //hide loader
        message.error(error.message);
    }
   }
  return (
    <div className='flex justify-center item-center h-screen w-screen'>
        <div className="card w-400 p-3">
            <div className="flex flex-col">
            <h1 className="text-2xl">Register</h1>
            <div className="divider"></div>
            <Form layout='vertical' className='mt-2' onFinish={onFinish}>
              <Form.Item name='name' label='Name'>
                    <input className='einput' type='text' placeholder='Name' id='name'/>
                </Form.Item>
                <Form.Item name='email' label='Email'>
                    <input className='einput' type='text' placeholder='Email' id='email'/>
                </Form.Item>
                <Form.Item name='password' label='Password'>
                    <input className='einput' type='text' placeholder='Password' id='password'/>
                </Form.Item>
                <button type='submit' className='primary-contained-btn mt-2 w-100'>Register</button>
                <Link to="/login" className='text-center mt-2'>Already Member ? Login</Link> 
            </Form>
            </div>
        </div>
    </div>
  )
}

