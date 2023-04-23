import React, { useState } from 'react';
import axios from 'axios';
import bg from '../assets/7176510.jpg'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function FeedBackStudent() {
  const [name, setName] = useState('');
  const [materialTitle, setMaterialTitle] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9090/study/feedback', {
        Name: name,
        materialTitle,
        feedback,
      });
      console.log( response.data);
      setName('');
      setMaterialTitle('');
      setFeedback('');
      toast.success('Feedback submitted successfully', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      window.location.reload();
      
    } catch (error) {
      console.error(error);
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
    
    <div className=''>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className='class=" w-auto h-auto flex flex-row items-center bg-white backdrop-blur-lg border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"'>
          <img className = ' w-auto m-auto h-48' src={bg} alt='feedback'/>
        
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <div className=' float-right box-border md:box-content rounded-md h-auto w-96 p-4 drop-shadow-md md:drop-shadow-xl bg-white backdrop-blur-3xl'>
              <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input type='text'value={name} onChange={(event) => setName(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='name here...'required/>
        </div>
      

        <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title OF Material</label>
          <input type='text'value={materialTitle} onChange={(event) => setMaterialTitle(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='title here...'required/>
        </div>
      
        <div className="mb-4">
          <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Feedback</label>
          <textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='Feedback here...'required/>
        </div>

        
        <div className="mt-10 m-auto">
          <Link to="/sms">
        <button type="submit" className="  text-white bg-red-500 border-3 border-black hover:shadow-lg hover:bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Cancel Now</button>
        </Link>
        <button type="submit" className=" h-10 float-right text-white bg-black hover:shadow-lg hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Submit Here</button>
        </div>
      </div>
    </div>  
  </div>    
      </form>
  
</div>

  )
}
