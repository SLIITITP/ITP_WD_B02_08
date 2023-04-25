import React ,{useState,useEffect} from 'react'
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import MaterialBg from '../assets/MaterialBg.jpg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function PdfMaterialCardTeacher() {

  const navigate = useNavigate();

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/study/viewPdf/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setGrade(response.data.grade);
        setSubject(response.data.subject);
        setTeacher(response.data.teacher);
        setFile(response.data.file);
      } catch (error) {
        console.error(error);
        // handle error
      }
    };

    fetchPdf();
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
    formData.append('file', file);

    try {
      const response = await axios.put(`http://localhost:9090/study/updatePdf/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // do something with the updated note data
      toast.success('PDF Material updated successfully', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
     
       // Delay navigation by 2 second
    setTimeout(() => {
      navigate('/smP');
    }, 2000);
      
    } catch (error) {
      console.error(error);
      // handle error
      toast.error('PDF Material updated unsuccess, please try Again!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:'colored'
      });
    }
  };

  const deletePdf = async () => {
    try {
      await axios.delete(`http://localhost:9090/study/deletePdf/${id}`);
      console.log('pdf deleted successfully');
      toast.success('PDF Material deleted successfully', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

          // Delay navigation by 1 second
    setTimeout(() => {
      navigate('/smP');
    }, 1000);

    } catch (error) {
      console.log(error.response.data);
      toast.error('Error Occurred!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      deletePdf();
    }
  };


  return (
    <div>
      <ToastContainer/>
      <div className="opacity-50 absolute">
      <img src={MaterialBg} alt="logo" />
    </div>
    <form onSubmit={handleSubmit}>
    <div  className='relative flex justify-center mt-8 '>

       <div className='box-border md:box-content rounded-md h-auto w-3/6 p-4 drop-shadow-md md:drop-shadow-xl bg-white'>
  
        
      <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} className="h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
        </div>
      
      
        <div className="mb-4">
          <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
          <input type='text' value={description} onChange={(event) => setDescription(event.target.value)} class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
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
          <input type='text' value={teacher} onChange={(event) => setTeacher(event.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"/>
        </div>

        <label for="file" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">File here</label>
        <input  Value = {file} className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" type="text"/>


        <label for="file" className=" mt-4 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add file here</label>
        <input type ="file" onChange={(event) => setFile(event.target.files[0])} className="!block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="large_size" />

        <div className="mt-10">
      
        <button type="submit"  className="ml-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">EDIT MATERIAL</button>
     
        
        <button type="button"onClick={() => handleDelete()}className=" float-right mr-8 text-white bg-red-600 hover:bg-red-400 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">DELETE MATERIAL</button>
        </div>
    
        
        
  </div>
  </div>
  </form>
      
    </div>
  )
}
