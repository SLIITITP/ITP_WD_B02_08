import React ,{useState,useEffect} from 'react'
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import MaterialBg from '../assets/MaterialBg.jpg';

export default function RecordMaterialTeacher() {

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [material, setMaterial] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/study/viewRecord/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setGrade(response.data.grade);
        setSubject(response.data.subject);
        setTeacher(response.data.teacher);
        setMaterial(response.data.material);
        // set any other fields you need to update
      } catch (error) {
        console.error(error);
        // handle error
      }
    };

    fetchRecord();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('grade', grade);
    formData.append('subject', subject);
    formData.append('teacher', teacher);
    formData.append('material', material);
    formData.append('file', file);

    try {
      const response = await axios.put(`http://localhost:9090/study/updateRecord/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // do something with the updated note data
    } catch (error) {
      console.error(error);
      // handle error
    }
  };
  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:3000/study/deleteRecord/${id}`);
      console.log('Note deleted successfully');
      
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = (rec) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(rec);
    
    }
  };




  return (
    <div>
      <div className="opacity-50 absolute">
      <img src={MaterialBg} alt="logo" />
    </div>
    <form onSubmit={handleSubmit}>
          <div  className='relative flex justify-center mt-8'>

<div className='box-border md:box-content rounded-md h-auto w-3/6 p-4 drop-shadow-md md:drop-shadow-xl bg-white'>

 
<div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
   <input type='text' value={title} onChange={(event) => setTitle(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
 </div>


 <div className="mb-4">
   <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
   <textarea value={description} onChange={(event) => setDescription(event.target.value)} class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
   <input type='text' value={category} onChange={(event) => setCategory(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade</label>
   <input type='text' value={grade} onChange={(event) => setGrade(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
   <input type='text' value={subject} onChange={(event) => setSubject(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Teacher</label>
   <input type='text'value={teacher} onChange={(event) => setTeacher(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
 </div>

 <div className="mb-4">
   <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recording URL</label>
   <input type='text'value={material} onChange={(event) => setMaterial(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
 </div>


 <label for="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File here</label>
 <input onChange={(event) => setFile(event.target.files[0])} className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="file"/>

 <div className="mt-10">
 <button type="submit" className="ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">EDIT MATERIAL</button>
 <button type="submit" onClick={() => handleDelete()}  className=" float-right mr-8 text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">DELETE MATERIAL</button>
 </div>

 
 
</div>
</div>
</form>
      
    </div>
  )
}
