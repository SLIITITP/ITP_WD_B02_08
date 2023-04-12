import React from 'react'
import MaterialBg from '../assets/MaterialBg.jpg'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
export default function ResearchMaterialCardStudent() {
  const { id } = useParams();
  const [research, setResearch] = useState('');


  useEffect(() => {
    const fetchRe = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/study/viewResearch/${id}`);
        setResearch(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchRe();
  }, [id]);
  console.log('research',research );

  const downloadFile = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/study/downloadResearch/${id}`, {
        responseType: 'blob',
      });
      const file = new Blob([response.data], { type: response.headers['content-type'] });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    } catch (error) {
      console.log(error);
    }
  };





  return (
    <div>
      <div className="opacity-50 absolute">
      <img src={MaterialBg} alt="logo" />
    </div>
         <div  className='relative flex justify-center mt-8'>

<div className='box-border md:box-content rounded-md h-auto w-auto p-4 drop-shadow-md md:drop-shadow-xl bg-white'>

 
<div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
   <input type='text' value= {research.title} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>


 <div className="mb-4">
   <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
   <textarea value = {research.description} class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
   <input type='text'value={research.category} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher</label>
   <input type='text'value={research.teacher} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <label for="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File here</label>
 <input value={research.file} className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="text"disabled/>

 <div className="mt-10">
<Link to="/fbs">
 <button type="submit" className="ml-2 mr-10 text-white bg-yellow-500 hover:shadow-xl hover:bg-yellow-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Feedback</button>
 </Link>
 
 <button type="submit"  onClick={downloadFile}  className=" float-right mr-2 text-white bg-green-700 hover:shadow-xl hover:bg-green-300 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Download material</button>
 </div>

 
 
</div>
</div>
      
      
    </div>
  )
}
