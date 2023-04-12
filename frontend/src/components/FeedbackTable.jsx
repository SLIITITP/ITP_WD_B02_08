import React from 'react'

export default function FeedbackTable() {
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
                <th scope="col" className="px-6 py-3">
                    action
                </th>
                
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">
                    Silver
                </td>
                <td className="px-6 py-4">
                    Laptop
                </td>
                <td className="px-6 py-4">
                    $2999
                </td>
                <td className="px-3 py-4" >
                <button type="button" className="text-white bg-orange-600 outline-black hover:shadow-lg hover:stroke-white font-medium rounded-full text-sm px-5 py-2.5 mr-1 mb-1">  
                View Details</button>

                
                
                </td>
              
                    

                
            </tr>
            
        </tbody>
    </table>
</div>
      
    </div>
  )
}
