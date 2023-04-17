import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';

function ClassEnrolling() {
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  const location = useLocation();

  const [classId] = useState(location.state.cId);
  const [grade] = useState(location.state.cGrade);
  const [subject] = useState(location.state.cSubject);
  const [teacher] = useState(location.state.cTeacher);
  const [date] = useState(location.state.cDate);
  const [time] = useState(location.state.cTime);
  const [fees] = useState(location.state.cFees);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:9090/class/getSpecificClass/${id}`);
        if (response.data && response.data.id && response.data.grade && response.data.subject && response.data.teacher) {
          setClassData(response.data);
        } else {
          setError('Invalid response from server'); 
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError('Error fetching class data');
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  console.log('loading:', loading);
  console.log('error:', error);
  console.log('classData:', classData);

  return (
    <div>
      <p>{id}</p>
      <p>{classData.subject}</p>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {classData && (
        <div>
          <h2>Class {classId}</h2>
          <h3>Grade {grade}</h3>
          <p>Subject {subject}</p>
          <p>Teacher: {teacher}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Fees: {fees}</p>
        </div>
      )}
      {!loading && !error && !classData && (
        <p>No data found for class {id}</p>
      )}
    </div>
  );
}

export default ClassEnrolling;
