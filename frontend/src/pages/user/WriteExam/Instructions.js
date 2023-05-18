// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Button, Col, Form, Row, Select, message , Table} from 'antd'
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import { useDispatch } from "react-redux";

// function Instructions({ examData, setView, startTimer }) {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   return (
//     <div className="flex flex-col items-center gap-5 a">
//       <ul className="flex flex-col gap-3">
//         <h1 className="text-2xl underline">Instructions</h1>
//         <li>Exam must be completed in {examData.duration} seconds.</li>
//         <li>
//           Exam will be submitted automatically after {examData.duration}{" "}
//           seconds.
//         </li>
//         <li>Once submitted, you cannot change your answers.</li>
//         <li>Do not refresh the page.</li>
//         <li>
//           You can use the <span className="font-bold">"Previous"</span> and{" "}
//           <span className="font-bold">"Next"</span> buttons to navigate between
//           questions.
//         </li>
//         <li>
//           Total marks of the exam is{" "}
//           <span className="font-bold">{examData.totalMarks}</span>.
//         </li>
//         <li>
//           Passing marks of the exam is{" "}
//           <span className="font-bold">{examData.passingMarks}</span>.
//         </li>
//       </ul>
//       <Form> 

//       <div className="flex gap-2">
//         <input className='einput' type='text'  name = "enrollmentkey" placeholder="Enter Enrollment key"/>
//         </div>
//       <br/>
//       <div className="flex gap-2">
//         <button className="primary-outlined-btn"
//          onClick={()=>navigate('/exams')}
//         >
//               CLOSE
//         </button>
//         <button
//           className="primary-contained-btn" type="submit"
//           onClick={() => {
//           //   startTimer();
//           //   setView("questions");
//           }}
//         >
//           Start Exam
//         </button>       
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default Instructions;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Select, message, Table } from 'antd'
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Nipun
  const { user } = useSelector((state) => state.users)
  const studentId = user.userID;
  console.log(studentId)


  const [subjectName, setSubjectName] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleCheckPayment = async () => {
    setLoading(true);
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
      console.log(currentMonth);
      const response = await axios.get('/api/payment/payHistory', {
        params: {
          studentId: studentId,
          subject: subjectName,
          month: currentMonth,
        },
      });
      const payments = response.data;
      console.log(payments)
      setIsPaid(payments.length > 0);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  //Nipun
  const handleStartExamClick = () => {
    const enrollmentKey = document.getElementsByName('enrollmentkey')[0].value;
    console.log('Enrollment Key:', enrollmentKey);
    console.log(examData.category, examData.grade)
    setSubjectName(examData.category);

    handleCheckPayment();
    console.log(isPaid)
    // Add a delay of 2 seconds
    setTimeout(() => {
      if (isPaid) {
        if (enrollmentKey === examData.enrollmentkey) {
          startTimer();
          setView("questions");
        } else {
          console.log("Enrollment key is invalid");
          toast.error("Enrollment key is invalid");
        }
      } else {
        console.log("Your payment not found for the subject in the current month.");
        toast.error("Your payment not found for the subject in the current month.");
      }
    }, 2000);

  };


  return (
    <div className="flex flex-col items-center gap-5 a">
      <ul className="flex flex-col gap-3">
        <h1 className="text-2xl underline">Instructions</h1>
        <li>Exam must be completed in {examData.duration} seconds.</li>
        <li>
          Exam will be submitted automatically after {examData.duration}{" "}
          seconds.
        </li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between
          questions.
        </li>
        <li>
          Total marks of the exam is{" "}
          <span className="font-bold">{examData.totalMarks}</span>.
        </li>
        <li>
          Passing marks of the exam is{" "}
          <span className="font-bold">{examData.passingMarks}</span>.
        </li>
      </ul>
      <Form>

        <div className="flex gap-2">
          <input className='einput' type='text' name="enrollmentkey" placeholder="Enter Enrollment key" />
        </div>
        <br />
        <div className="flex gap-2">
          <button className="primary-outlined-btn"
            onClick={() => navigate('/exams')}
          >
            CLOSE
          </button>
          <button
            className="primary-contained-btn" type="button"
            onClick={handleStartExamClick}
          >
            Start Exam
          </button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Instructions;

