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

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row, Select, message , Table} from 'antd'
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { useDispatch } from "react-redux";

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleStartExamClick = () => {
    const enrollmentKey = document.getElementsByName('enrollmentkey')[0].value;
    console.log('Enrollment Key:', enrollmentKey);
    if(enrollmentKey == examData.enrollmentkey){
       startTimer();
       setView("questions");
    }else{
      console.log("Enrollment key is invalid")
    }
    
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
        <input className='einput' type='text'  name="enrollmentkey" placeholder="Enter Enrollment key"/>
        </div>
      <br/>
      <div className="flex gap-2">
        <button className="primary-outlined-btn"
         onClick={()=>navigate('/exams')}
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
    </div>
  );
}

export default Instructions;

