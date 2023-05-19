
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';

function Instructions({ examData, setView, startTimer }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);
  const studentId = user.userID;

  const [subjectName, setSubjectName] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentDate = moment().format('YYYY-MM-DD');
  const currentTime = moment().format('HH:mm');

  const examDurationWithExtraTime = moment.duration(examData.duration, 'minutes').add(40, 'minutes').asSeconds();
  console.log("Exam Duration with extra time:", moment.utc(examDurationWithExtraTime * 1000).format("HH:mm:ss"));

  const handleCheckPayment = async () => {
    setLoading(true);
    try {
      const currentMonth = moment().format('MMMM');
      const response = await axios.get('/api/payment/payHistory', {
        params: {
          studentId: studentId,
          subject: subjectName,
          month: currentMonth,
        },
      });
      const payments = response.data;
      console.log(payments);
      setIsPaid(payments.length > 0);
      CheckPayment(payments.length > 0);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const CheckPayment = (paid) => {
    if (paid) {
      console.log("Your payment was found for the subject in the current month.");
      toast.success("Your payment was found for the subject in the current month.");
    } else {
      console.log("Your payment was not found for the subject in the current month.");
      alert("Your payment was not found for the subject in the current month.");
      navigate('/exams'); // Navigate to the home page if payment is not valid
    }
  };

  const handleStartExamClick = () => {
    const enrollmentKey = document.getElementsByName('enrollmentkey')[0].value;
    setSubjectName(examData.category);

    

    if (currentDate > examData.date) {
      alert('You Are Late To The Exam');
    } else if (currentDate < examData.date) {
      alert('Exam Not Started Yet');
    } else if (enrollmentKey === examData.enrollmentkey) {
      startTimer();
      setView('questions');
    } else if (enrollmentKey === '') {
      alert('Enter Enrollment Key');
    } else {
      alert('Invalid Enrollment Key');
    }
  };

  useEffect(() => {
    handleCheckPayment();
  }, []);

  return (
    <div className="flex flex-col items-center gap-5 a">
      <ul className="flex flex-col gap-3">
        <h1 className="text-2xl underline">Instructions</h1>
        <li>Exam must be completed in {examData.duration} seconds.</li>
        <li>Exam will be submitted automatically after {examData.duration} seconds.</li>
        <li>Once submitted, you cannot change your answers.</li>
        <li>Do not refresh the page.</li>
        <li>
          You can use the <span className="font-bold">"Previous"</span> and{" "}
          <span className="font-bold">"Next"</span> buttons to navigate between questions.
        </li>
        <li>Total marks of the exam is <span className="font-bold">{examData.totalMarks}</span>.</li>
        <li>Passing marks of the exam is <span className="font-bold">{examData.passingMarks}</span>.</li>
        <li>Exam Date is: <span className="font-bold">{examData.date}</span>.</li>
      </ul>
      <Form>
        <div className="flex gap-2">
          <input className='einput' type='text' name="enrollmentkey" placeholder="Enter Enrollment key" />
        </div>
        <br />
        <div className="flex gap-2">
          <button className="primary-outlined-btn" onClick={() => navigate('/')}>
            CLOSE
          </button>
          <button className="primary-contained-btn" type="button" onClick={handleStartExamClick}>
            Start Exam
          </button>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
}

export default Instructions;


