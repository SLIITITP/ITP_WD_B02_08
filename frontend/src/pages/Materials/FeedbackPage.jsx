import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cover from '../../assets/feedback.jpg'
import FeedBackStudent from '../../components/FeedBackStudent'

export default function FeedbackPage() {

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
      
      axios.get('http://localhost:9090/study/allFeedback')
        .then(res => {
          setFeedbacks(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }, []);

  return (
    <>
   
      <div className="opacity-50 absolute">
        <img src={Cover} alt="logo" />
      </div>
      <h1 className=' mt-8 text-4xl text-black text-center relative font-bold'>Welcome to feedback Section</h1>
    <div className="flex items-center max-h-screen">
      <div className=" mx-auto mt-8">
        <FeedBackStudent/>
      </div>
      </div>
      

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg  m-16">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Student
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Feedback
                </th>
                <th scope="col" className="px-6 py-3">
                    teacher
                </th>
                <th scope="col" className="px-6 py-3">
                    Reply
                </th>
                
            </tr>
        </thead>
        <tbody>
        {feedbacks.map((feedback, index) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {feedback.Name}
    </th>
    <td className="px-6 py-4">
      {feedback.materialTitle}
    </td>
    <td className="px-6 py-4">
      {feedback.feedback}
    </td>
    <td className="px-6 py-4">
      {feedback.replies.map((reply, index) => (
        <div key={index}>
          {reply.teacherName}
        </div>
      ))}
    </td>
    <td className="px-3 py-4">
      {feedback.replies.map((reply, index) => (
        <div key={index}>
          {reply.reply}
        </div>
      ))}
    </td>
  </tr>
))}

            
        </tbody>
    </table>
</div>

   </>
    
  )
}
