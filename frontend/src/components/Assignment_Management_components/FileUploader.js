

import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useState, useRef } from 'react';
//import ReactToPrint from 'react-to-print';

export default function FileUploader() {

  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');
  const [assignmentType, setAssignment] = useState('');
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setFile(file);
  };

  //const componentRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('grade', grade);
    formData.append('assignmentType', assignmentType);
    formData.append('subject', subject);
    formData.append('file', file);


   
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

  return (
    <div>


      <form onSubmit={handleFormSubmit}>
        

        <div className="mb-6">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student ID</label>
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="student id.." required />
        </div>


        <div className="mb-6">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade</label>
          <input type="text" value={grade} onChange={(event) => setGrade(event.target.value)} id="grade" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="enter your grade" required />
        </div>


        <div className="mb-6">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Assignment Type</label>

          <select name="type" id="type" value={assignmentType} onChange={(event) => setAssignment(event.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
            <option value="">Select Assignment Type</option>
            <option value="Home Work">Home Work</option>
            <option value="Group Work">Group Work</option>
            <option value="Subject Related">Subject Related</option>
            <option value="Extra Work">Extra Work</option>
          </select>


        </div>



        <div className="mb-6">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
          <input type="text" value={subject} onChange={(event) => setSubject(event.target.value)} id="subject" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="enter the subject" required />
        </div>






        <label for="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File here</label>
        <input type="file" onChange={handleFileChange} className="!block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" />



        <div className="mt-16">


          <button type="submit" className=" float-right px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">UPLOAD</button>
        </div>
      </form>



    </div>



  )

}