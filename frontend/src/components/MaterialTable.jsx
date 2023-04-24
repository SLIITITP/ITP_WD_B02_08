import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';


export default function MaterialTable() {

    const [notes, setNotes] = useState([]);

    
  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:9090/study/allNotes');
      setNotes(response.data); 
    } catch (error) {
      console.log(error.response.data); 
    }
  };

  
  useEffect(() => {
    fetchNotes();
  }, []);

 
  const handleView = (note) => {
  
    console.log(note);
  };

  return (
    <>
    
    <div className=''>
        
<div className="relative overflow-x-auto shadow-md sm:rounded-lg  m-16">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    title
                </th>
                <th scope="col" className="px-6 py-3">
                    grade
                </th>
                <th scope="col" className="px-6 py-3">
                    subject
                </th>
                <th scope="col" className="px-6 py-3">
                    teacher
                </th>
                <th scope="col" className=" px-16 py-3">
                    action
                </th>
                
            </tr>
        </thead>
        <tbody >
        {notes.map((note) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"  key={note._id}>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                     {note.title}
                </th>
                <td className="px-6 py-4">
                    {note.grade}
                </td>
                <td className="px-6 py-4">
                    {note.subject}
                </td>
                <td className="px-6 py-4">
                    {note.teacher}
                </td>
                <Link to={`/smN/t/${note._id}`}>
                <td className="px-3 py-4" >
                <button onClick={() => handleView(note)} type="button" className="text-white bg-indigo-600 outline-black hover:shadow-lg hover:stroke-white font-medium rounded-full text-sm px-5 py-2.5 mr-1 mb-1 hover:bg-indigo-500">  
                View Details</button>
                </td>
                </Link>
                
                
           
              
                    

                
            </tr>
        ))}
        </tbody>
    </table>
</div>

      
    </div>
    </>
  )
}
