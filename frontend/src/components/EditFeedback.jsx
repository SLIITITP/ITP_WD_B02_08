import React from 'react'
import bg from '../assets/7176510.jpg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function EditFeedback() {

  const { id } = useParams();
  const [teacherName, setTeacherName] = useState('');
  const [reply, setReply] = useState('');

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/study/getFeedback/${id}`);
        const { Name, materialTitle, feedback } = response.data;
       
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeedback();
  }, [id]);

  const updateFeedback = async (teacherName, reply) => {
    try {
      const response = await axios.put(`http://localhost:9090/study/updateFeedback/${id}`, { teacherName, reply });
      console.log(response.data)
      toast.success('Feedback submitted successfully', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      window.location.reload();
     
    } catch (err) {
      console.error(err);
      toast.error('Error submitting feedback',{
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  


  return (
    <div>
      <ToastContainer/>
        <div className='class=" w-auto h-auto flex flex-col items-center bg-white backdrop-blur-lg border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"'>
          <img className = ' w-auto m-auto h-48' src={bg} alt='feedback'/>
        
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <div className=' float-right box-border md:box-content rounded-md h-auto w-96 p-4 drop-shadow-md md:drop-shadow-xl bg-white backdrop-blur-3xl'>
              <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
          <input type='text' className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='name here...'disabled/>
        </div>
      

        <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title OF Material</label>
          <input type='text' className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='title here...'disabled/>
        </div>
      
        <div className="mb-4">
          <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Feedback</label>
          <textarea class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='Feedback here...'disabled/>
        </div>

        <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input type='text'value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='Your Name...' required/>
        </div>

        <div className="mb-4">
          <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Reply</label>
          <textarea value={reply} onChange={(e) => setReply(e.target.value)}class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='Reply here...'required/>
        </div>

        

        
        <div className="mt-10">
          <Link to="/smt">
        <button type="submit" className=" ml-8 text-white bg-red-500 border-3 border-black hover:shadow-lg hover:bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Cancel Now</button>
        </Link>
       
       <button type="submit"onClick={() => updateFeedback(teacherName, reply)} className=" mr-8 float-right text-white bg-black hover:shadow-lg hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Submit Here</button>
       
       
        </div>
      </div>
    </div>  
  </div>    
  </div>    
      
    
  )
}
