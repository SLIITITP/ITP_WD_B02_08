import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'

export default function PdfMaterialTable() {


     const [files, setFiles] = useState([]);
    
        
      const fetchPdf = async () => {
        try {
          const response = await axios.get('http://localhost:9090/study/allPdf');
          setFiles(response.data); 
        } catch (error) {
          console.log(error.response.data); 
        }
      };
    
      
      useEffect(() => {
        fetchPdf();
      }, []);
    
     
      const handleView = (pdf) => {
      
        console.log(pdf);
      };




  return (
    <div>
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
                <th scope="col" className="px-16 py-3">
                    action
                </th>
                
            </tr>
        </thead>
        <tbody>
        {files.map((pdf) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {pdf.title} 
                </th>
                <td className="px-6 py-4">
                    {pdf.grade}
                </td>
                <td className="px-6 py-4">
                    {pdf.subject}
                </td>
                <td className="px-6 py-4">
                    {pdf.teacher}
                </td>
                <td className="px-3 py-4" >
                    <Link to={`/smP/t/${pdf._id}`}>
                <button type="submit" onClick={() => handleView(pdf)} className="text-white bg-indigo-600 outline-black hover:shadow-lg hover:stroke-white font-medium rounded-full text-sm px-5 py-2.5 mr-1 mb-1 hover:bg-indigo-500">  
                View Details</button>
                    </Link>
                
                
                </td>
              
                    

                
            </tr>
        ))}
            
        </tbody>
    </table>
</div>
      
    </div>
  )
}
