import React from 'react'
import MaterialBg from '../assets/MaterialBg.jpg'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';

export default function RecordMaterialCardStudent() {

  const { id } = useParams();
  const [record, setRecord] = useState('');


  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/study/viewRecord/${id}`);
        setRecord(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchRecord();
  }, [id]);
  console.log('record', record);


  return (
    <div>
         <div className="opacity-50 absolute">
      <img src={MaterialBg} alt="logo" />
    </div>
         <div  className='relative flex justify-center mt-8'>

<div className='box-border md:box-content rounded-md h-auto w-auto p-4 drop-shadow-md md:drop-shadow-xl bg-white'>

 
<div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
   <input type='text'value= {record.title} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>


 <div className="mb-4">
   <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
   <textarea value = {record.description} class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
   <input type='text'value={record.category} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade</label>
   <input type='text' value= {record.grade} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
   <input type='text' value = {record.subject} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher</label>
   <input type='text' value={record.teacher} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">recording URL</label>
   <input type='text' className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"disabled/>
 </div>

 <div className="mt-10">
  <Link to="/fbs">
 <button type="submit" className="ml-2 mr-48 justify-center text-white bg-yellow-500 hover:shadow-xl hover:bg-yellow-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Feedback</button>
 </Link>

 </div>

 
 
</div>
</div>
      
      
    </div>
  )
}
