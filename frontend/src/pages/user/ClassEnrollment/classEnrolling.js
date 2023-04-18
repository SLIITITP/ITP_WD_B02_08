import React, { useState} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ClassEnrolling() {

  const location = useLocation();

  const [classId] = useState(location.state.cId);
  const [grade] = useState(location.state.cGrade);
  const [subject] = useState(location.state.cSubject);
  const [teacher] = useState(location.state.cTeacher);
  const [date] = useState(location.state.cDate);
  const [time] = useState(location.state.cTime);
  const [fees] = useState(location.state.cFees);

  const handleEnroll = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:9090/enrollments", {
        studentID: localStorage.getItem("studentID"), // Get the student ID from localStorage
        classID: classId,
      });
      console.log('Enrollment response:', res.data);
      alert("Enrollment successful!"); // Display a success message
    } catch (err) {
      console.error('Enrollment failed:', err);
      alert("Enrollment failed. Please try again."); // Display an error message
    }
  };

  return (
    <div>
      <h1>Enroll to the Class</h1>
      <div>
      {grade && (<p>Grade :{grade}</p>)}
      {subject && (<p>Subject :{subject}</p>)}
      {teacher && (<p>Teacher :{teacher}</p>)}
      {date && (<p>Date :{date}</p>)}
      {time && (<p>Time :{time}</p>)}
      {fees && (<p>Fees : Rs.{fees}</p>)}
      </div>
      <button type="submit" className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
       focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center'
       onClick={handleEnroll}>Enroll</button>   
    </div>
  );

}
export default ClassEnrolling;
