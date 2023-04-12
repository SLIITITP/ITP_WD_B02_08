import React from 'react'
import Cover from '../../assets/feedback.jpg';
import bg from '../../assets/7176510.jpg'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditFeedBackPage() {
    const { id } = useParams();
    const [teacherName, setTeacherName] = useState('');
    const [reply, setReply] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackData, setFeedbackData] = useState({
        Name: "",
        materialTitle: "",
        feedback: "",
      });

    useEffect(() => {
      
      axios.get('http://localhost:9090/study/allFeedback')
        .then(res => {
          setFeedbacks(res.data);
        })
        .catch(err => {
          console.error(err);
        });
    }, []);
  
    useEffect(() => {
      const fetchFeedback = async () => {
        try {
          const response = await axios.get(`http://localhost:9090/study/getFeedback/${id}`);
          const { Name, materialTitle, feedback } = response.data;
          setFeedbackData({
            Name,
            materialTitle,
            feedback,
          });
         
        } catch (err) {
          console.error(err);
        }
      };
  
      fetchFeedback();
    }, [id]);
  
    const updateFeedback = async (teacherName, reply) => {
      try {
        const response = await axios.put(`http://localhost:9090/study/updateFeedback/${id}`, { teacherName, reply });
        console.log(response.data)
        setTeacherName('');
        setReply('');
       
      } catch (err) {
        console.error(err);
      }
    };
  
  return (
    <>
    
    <div className="opacity-50 absolute">
      <img src={Cover} alt="logo" />
    </div>
    <h1 className=' mt-8 text-4xl text-black text-center relative font-bold'>Welcome to feedback Section</h1>
    <div className="flex items-center max-h-screen">
    <div className="mx-auto mt-8">
     
    <div>
        <div className='class=" m-auto w-auto h-auto flex  items-center bg-white backdrop-blur-lg border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100"'>
          <img className = ' w-auto m-auto h-48' src={bg} alt='feedback'/>
        
      <div className='flex flex-col justify-between p-4 leading-normal'>
        <div className=' float-right box-border md:box-content rounded-md h-auto w-96 p-4 drop-shadow-md md:drop-shadow-xl bg-white backdrop-blur-3xl'>
              <div className="mb-4">
              
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Student Name</label>
          <input type='text'value={feedbackData.Name} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='name here...'disabled/>
        </div>
      

        <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title OF Material</label>
          <input type='text' value={feedbackData.materialTitle} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='title here...'disabled/>
        </div>
      
        <div className="mb-4">
          <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Feedback</label>
          <textarea value={feedbackData.feedback} class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='Feedback here...'disabled/>
        </div>
      
        <div className="mb-4">
          <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
          <input type='text'value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className=" h-10 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='Your Name...'/>
        </div>

        <div className="mb-4">
          <label for="Description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Reply</label>
          <textarea value={reply} onChange={(e) => setReply(e.target.value)}class=" h-20 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"placeholder='Reply here...'/>
        </div>

        

        
        <div className="mt-10 flex-row m-auto">
          <Link to="/smt">
        <button type="submit" className=" text-white bg-red-500 border-3 border-black hover:shadow-lg hover:bg-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Cancel Now</button>
        </Link>
       
       <button type="submit"onClick={() => updateFeedback(teacherName, reply)} className=" h-10 float-right text-white bg-black hover:shadow-lg hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Submit Here</button>
        </div>
      </div>
    </div>  
  </div>    
  </div>    




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
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                
                
            </tr>
        </thead>
        <tbody>
        {feedbacks.map((feedback, index) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
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

                <td className="px-3 py-4" >
                    <Link to={`/fbs/t/${feedback._id}`}>
                <button type="button" className="text-white bg-indigo-600 hover:bg-indigo-400 outline-black hover:shadow-lg hover:stroke-white font-medium rounded-full text-sm px-5 py-2.5 mr-1 mb-1">  
                    reply </button></Link>
                </td>
              
            </tr>
            
        ))}
        </tbody>
    </table>
</div>
  </>
  )
}
