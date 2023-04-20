

import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState,useRef} from 'react';
//import ReactToPrint from 'react-to-print';

export default function FileUploader() {

  const [name, setName] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  
  //const componentRef = useRef();

  const handleFormSubmit = async (event) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('file', file);

    
      event.preventDefault();
      try {
        const Pdf = await axios.post('http://localhost:9090/items/addItems', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(Pdf.data);
       
        setName('');
        setFile(null);
        event.target.reset(); // clear the form inputs, including the file input
       
      } catch (error) {
        console.log(error.Pdf.data);
      }
    };

    return(
      <div>
      
      
      <form onSubmit={handleFormSubmit}>
      
      <div className="mb-6">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name.."required/>
        </div>
      
      
      
      
      
        
       
      <label for="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File here</label>
      <input  type="file" onChange={handleFileChange}className="!block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size"/>
      
      
      
        <div className="mt-16">
       
        
        <button type="submit" className=" float-right px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">UPLOAD</button>
        </div>
      </form>

      
            
          </div>
          
      
 
    )

  }