import React from 'react'
import axios from 'axios';
import { useState,useRef} from 'react';
import { Link, useNavigate} from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateTitle,validateDescription,validateGrade,validateSubject,validateTeacher,validateNoteFile } from '../validations/StudyFormValidations';



export default function AddNoteMaterial() {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
 /*  const [category, setCategory] = useState(''); */
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };
  const componentRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

      // Validate form fields
  const titleError = validateTitle(title);
  const descriptionError = validateDescription(description);
  const gradeError = validateGrade(grade);
  const subjectError = validateSubject(subject);
  const teacherError = validateTeacher(teacher);
  const fileError = validateNoteFile(file);
  
  if (titleError || descriptionError || teacherError || fileError || gradeError||subjectError) {
    toast.error(titleError || descriptionError||gradeError||subjectError || teacherError || fileError, {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return;
  }
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
 /*    formData.append('category', category); */
    formData.append('grade', grade);
    formData.append('subject', subject);
    formData.append('teacher', teacher);
     // Check file type
  if (file && (file.type !== 'application/msword' && file.type !== 'text/plain')) {
    toast.error('Invalid file type! Only doc and txt files are allowed.', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    return;
  }
    formData.append('file', file);

    
     
      
      try {
        const Note = await axios.post('http://localhost:9090/study/notes', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(Note.data);
       
        setTitle('');
        setDescription('');
      /*   setCategory(''); */
        setGrade('');
        setSubject('');
        setTeacher('');
        setFile(null);
        event.target.reset(); // clear the form inputs, including the file input
        toast.success('Notes added successfully', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate('/smN');
        }, 2000);
       
       
      } catch (error) {
        console.log(error.Note.data);
        toast.error('Error occurred!', {
          position: 'top-center',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
   
      }
     /*  toast.error('Error occurred!', {
        position: 'top-center',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }); */
    };

    const pageStyle = `
    @page {
      size: A4;
      margin: 1cm;
      @top-center {
        content: "Thilina Institute Hanwella";
        font-size: 28px;
        font-weight: bold;
      }
  `;

  



  return (
    <>
     <ToastContainer />
    <div ref={componentRef} className='!box-border md:box-content rounded-md h-3/4 w-3/5 p-4 drop-shadow-md md:drop-shadow-xl backdrop-blur-lg opacity-200'>
      
<form  onSubmit={handleFormSubmit}>

<div className="mb-6">
    <label for="title" className="!block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} id="description" className="!shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Title of lesson..." />
  </div>


  <div className="mb-6">
    <label for="Description" className="!block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
    <textarea id="description" value={description} onChange={(event)=> setDescription(event.target.value)} className="!shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Description of material..." />
  </div>

{/*   <div className="mb-6">
    <label for="category" className="!block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
    <select id="category"onChange={(event)=> setCategory(event.target.value)}  className="!shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
      <option value="notes">Notes</option>
      <option value="pdf">Pdf documents</option>
      <option value= "recordings" >recordings</option>
      <option value= "research" >research papers</option>
      </select>
  </div> */}

  <div className="mb-6">
    <label for="grade" className="!block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade</label>
    <select id="grade"  onChange={(event)=> setGrade(event.target.value)}  className="!shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
    <option value="" disabled selected >select grade</option>
      <option value= "grade 6">grade 6</option>
      <option value="grade 7">grade 7</option>
      <option value="grade 8">grade 8</option>
      <option value="grade 9">grade 9</option>
      <option value="grade 10">grade 10</option>
      <option value="grade 11">grade 11</option>
      <option value="grade 12">grade 12</option>
      <option value="grade 13">grade 13</option>
      </select>
  </div>

  <div className="mb-6">
    <label for="subject" className="!block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
    <input type="text" value={subject} onChange={(event)=>setSubject(event.target.value)} id="description" className="!shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Subject of  notes..."/>
  </div>

  <div className="mb-6">
    <label for="teacher" className="!block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input type="text" value ={teacher} onChange={(event)=> setTeacher(event.target.value)} id="description" className="!shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Your name ..." />
  </div>

  
 
<label for="file" className="!block mb-2 text-sm font-medium text-gray-900 dark:text-white">File here</label>
<input id="files"  onChange={handleFileChange} className= " !block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type='file'/>



  <div className="mt-16">
    <Link to="/smN">
  <button type="button" className="!px-5 py-3 text-base font-medium text-center text-blue-800 stroke-black bg-white hover:stroke-blue-600 hover:shadow-lg rounded-lg  focus:ring-4 focus:outline-none">CANCEL</button>
  </Link>
  
  <button type="submit" className="!float-right px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">UPLOAD</button>
  
  
  </div>
</form>

<ReactToPrint
  trigger={() => <button className='bg-yellow-400 border-2 border-black mt-1 font-bold float-right p-2 hover:bg-yellow-300'>Download Report</button>}
  content={() => componentRef.current}
  documentTitle="Thilina institute Hanwella"
  pageStyle={pageStyle}
/>


      
    </div>
    
  
    </>
  )
}

