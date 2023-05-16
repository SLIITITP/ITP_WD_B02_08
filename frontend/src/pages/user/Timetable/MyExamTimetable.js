import { message} from "antd";
import React, { useState, useEffect } from "react";
import { getProfile} from "../../.././apicalls/helper";
import {getAllExams } from "../../../apicalls/exams";
import moment from 'moment';

function MyExamTimetable() {

  const [exams, setExams] = useState([]);
  const [stdgrade, setGrade] = useState([]);
  const [apiData, setApiData] = useState({});
  const [apiData1, setApiData1] = useState({});
  const moment = require('moment');

  useEffect(() => {
    let usernameFrom = localStorage.getItem("userName");
    console.log(usernameFrom);
    getProfile(usernameFrom).then((results) => {
      let apiData = results.data;
      setApiData(results.data);
    });
  }, []);

  const studentGrade = parseInt(apiData?.grade, 10);
//handle the grade click
//   const handleGradeClick = (grade) => {
//      setActiveGrade(grade);
//    };
//   //Grade buttons
//   const gradeButtons = [
//     { grade: 1, label: 'Grade 1' },
//     { grade: 2, label: 'Grade 2' },
//     { grade: 3, label: 'Grade 3' },
//     { grade: 4, label: 'Grade 4' },
//     { grade: 5, label: 'Grade 5' },
//      { grade: 6, label: 'Grade 6' },
//      { grade: 7, label: 'Grade 7' },
//      { grade: 8, label: 'Grade 8' },
//      { grade: 9, label: 'Grade 9' },
//      { grade: 10, label: 'Grade 10' },
//      { grade: 11, label: 'Grade 11' },
//    ];

  //Get All Exams data 
  
  
  const getExamsData = async () => {
    try {
      const response = await getAllExams();
      if (response.success) {
        //make the date and time sequence
        const sortedExams = response.data.sort((a, b) => {
            // Compare dates
            if (a.date !== b.date) {
              return new Date(a.date) - new Date(b.date);
            }
            // Compare times if dates are equal
            const aTime = moment(a.time, 'hh:mm a');
            const bTime = moment(b.time, 'hh:mm a');
            return aTime.diff(bTime);
          });
          setExams(sortedExams);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

 useEffect(() => {
    getExamsData();
  }, []);


return (
<div className="container my-5 ml-9" style={{ maxWidth: "1600px"}}>     
{/*View timetable*/}
<div class="col-11 ml-10" >
<h3 className="mb-4 mt-4 text-center font-medium text-2xl text-gray-900 dark:text-white">
Grade - {studentGrade} Exam Schedule</h3> 

<div className="table-responsive">
<table className="table table-striped table-hover">
  <thead className="text-center">
    <tr>
      <th>Grade</th>
      <th>Date</th>
      <th>Time</th>
      <th>Exam Name</th>
      <th>Subject</th>     
      <th>Duration</th>
    </tr>
  </thead>
  <tbody className="text-center"> 
    {exams
    .filter((exams) => exams.grade === studentGrade)
    .map((exam) => (
        <tr key={exam.id}>
          <td>{exam.grade}</td>   
          <td>{exam.date}</td>
          <td>{exam.time}</td>
          <td>{exam.name}</td>
          <td>{exam.category}</td>
          <td>{exam.duration} hrs</td>
        </tr>
      ))}
  </tbody>
</table>
</div>

</div>
</div>
);
   
}

export default MyExamTimetable;








