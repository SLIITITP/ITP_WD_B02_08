import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState,useEffect } from 'react'

export default function ResearchMaterialTable() {

    const [riles, setRIles] = useState([]);
    
        
      const fetchRes = async () => {
        try {
          const response = await axios.get('http://localhost:9090/study/allResearch');
          setRIles(response.data); 
        } catch (error) {
          console.log(error.response.data); 
        }
      };
    
      
      useEffect(() => {
        fetchRes();
      }, []);
    
     
      const handleView = (research) => {
      
        console.log(research);
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
                    description
                </th>
                <th scope="col" className="px-6 py-3">
                    category
                </th>
                <th scope="col" className="px-6 py-3">
                    teacher
                </th>
                <th scope="col" className="px-6 py-3">
                    action
                </th>
                
            </tr>
        </thead>
        <tbody>
        {riles.map((research) => (

            
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {research.title}
                </th>
                <td className="px-6 py-4">
                    {research.description}
                </td>
                <td className="px-6 py-4">
                    {research.category}
                </td>
                <td className="px-6 py-4">
                    {research.teacher}
                </td>
                <td className="px-3 py-4" >
                    <Link to={`/smR/t/${research._id}`}>
                <button type="submit" onClick={() => handleView(research)} className="text-white bg-orange-600 outline-black hover:shadow-lg hover:stroke-white font-medium rounded-full text-sm px-5 py-2.5 mr-1 mb-1">  
                View Details</button></Link>

                
                
                </td>
              
                    

                
            </tr>
            ))}
            
        </tbody>
    </table>
</div>
      
    </div>
  )
}
