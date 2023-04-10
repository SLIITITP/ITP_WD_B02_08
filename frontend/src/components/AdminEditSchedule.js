import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimetableSideNav from "./TimetableSideNav";
import "../stylesheets/Timetable-form.css"
function AdminEditSchedule() {
  
 //view timetabe 
  const [classes, setClasses] = useState([]);
  const [activeGrade, setActiveGrade] = useState('6');
  const handleGradeClick = (grade) => {
    setActiveGrade(grade);
  };
  const gradeButtons = [
    { grade: '6', label: 'Grade 6' },
    { grade: '7', label: 'Grade 7' },
    { grade: '8', label: 'Grade 8' },
    { grade: '9', label: 'Grade 9' },
    { grade: '10', label: 'Grade 10' },
    { grade: '11', label: 'Grade 11' },
  ];

  useEffect(() => {
    axios
      .get('http://localhost:9090/class/allClasses')
      .then((res) => {
        setClasses(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);



//Edit Class
  const [grade] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fees, setFees] = useState("");

  function sendData(e) {
    e.preventDefault();
    if (!grade || !subject || !teacher || !hall || !date || !time || !fees) {
      alert("Please fill out all fields.");
      return;
    }
    const updatedClass = {
      grade,
      subject,
      teacher,
      hall,
      date,
      time,
      fees
    };
    console.log("selectedClass:", selectedClass);
    axios.put(`http://localhost:9090/class/updateClass/${selectedClass.id}`, updatedClass)
      .then(() => {
        alert("Class updated");
        axios
        .get('http://localhost:9090/class/allClasses')
        .then((res) => {
          setClasses(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
    }

//Click to edit class details
const [selectedClass, setSelectedClass] = useState(null);

function handleClassClick(clz) {
  setSelectedClass({
    id: clz._id,
    grade: clz.grade,
    subject: clz.subject,
    teacher: clz.teacher,
    hall: clz.hall,
    date: clz.date,
    time: clz.time,
    fees: clz.fees
  });
}

//Edit Class Form Input field (Avoid duplicating)
function InputField({ label, placeholder, value, onChange }) {
  return (
    <div className="col-md-12 mb-1 d-flex items-center">
      <label htmlFor={label} className="mr-2">
        {label}:
      </label>
      <input
        type="text"
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
        focus:ring-2 sm:text-sm sm:leading-6"
        id={label.toLowerCase()}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

//Delete Class
function deleteClass(id) {
  console.log("selectedClass:", selectedClass);
  axios
    .delete(`http://localhost:9090/class/deleteClass/${selectedClass.id}`)
    .then((res) => {
      alert("Class deleted");
      axios
        .get('http://localhost:9090/class/allClasses')
        .then((res) => {
          setClasses(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    })
    .catch((err) => {
      alert(err.message);
    });
}

return (
   
<div className="container my-5 " style={{ maxWidth: "1600px"}}>
    <TimetableSideNav/>
    <div className="row" >
      {/*View timetable*/}
      <div class="col-7" style={{marginLeft:"200px"}}>
      <h3 className="mb-4 text-center font-medium text-2xl text-gray-900 dark:text-white">All Classes</h3>
      <nav className="d-flex justify-content-center mb-4">
        <ul className="nav nav-pills">
        {gradeButtons.map((button) => (
            <li className="nav-item" key={button.grade}>
              <button
                className={`nav-link ${activeGrade === button.grade ? 'active' : ''}`}
                onClick={() => handleGradeClick(button.grade)}
              >
                {button.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="text-center">
            <tr>
              <th>Grade</th>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Hall</th>
              <th>Date</th>
              <th>Time</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {classes
              .filter((clz) => clz.grade === activeGrade)
              .map((clz) => (
                <tr key={clz._id} onClick={() => handleClassClick(clz)}>
                  <td>{clz.grade}</td>
                  <td>{clz.subject}</td>
                  <td>{clz.teacher}</td>
                  <td>{clz.hall}</td>
                  <td>{clz.date}</td>
                  <td>{clz.time}</td>
                  <td>{clz.fees}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      </div>

      <div class="col-1" style={{width: "2%"}}>
      <div class="d-flex " style={{height: "100vh"}}>
         <div class="vr"></div>
      </div>
      </div>

  {/*Edit Classes Form*/}
  <div class="col" >
  <h3 className="mb-4 text-center font-medium text-2xl text-gray-900 dark:text-white">Edit Class Details</h3> 
  <div className="container">
  <form>

  <div className="row">
     <InputField label="Grade" placeholder={selectedClass} value={activeGrade} />
  </div>

  <div className="row">
     <InputField label="Subject" placeholder={selectedClass ? selectedClass.subject : "Subject"} value={subject} 
      onChange={(e) => setSubject(e.target.value)} />
  </div>
  
  <div className="row">
     <InputField label="Teacher" placeholder={selectedClass ? selectedClass.teacher : "Teacher's Name"} value={teacher}
      onChange={(e) => setTeacher(e.target.value)}
     />
  </div>
  
  <div className="row">
     <InputField label="Hall" placeholder={selectedClass ? selectedClass.hall : "Hall"} value={hall}
      onChange={(e) => setHall(e.target.value)}
     />
  </div>
  
  <div className="row">
     <InputField label="Date" placeholder={selectedClass ? selectedClass.date : "Date"} value={date}
      onChange={(e) => setDate(e.target.value)}
     />
  </div>
  
  <div className="row">
     <InputField label="Time" placeholder={selectedClass ? selectedClass.time : "Time"} value={time}
      onChange={(e) => setTime(e.target.value)}
     />
  </div>
 
  <div className="row">
    <InputField label="Fees" placeholder={selectedClass ? selectedClass.fees : "Fees"} value={fees}
     onChange={(e) => setFees(e.target.value)}
    />
  </div>

  <button type="submit" onClick={sendData} className="mt-2 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none 
  font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center">Update</button>

  <button type="submit" onClick={deleteClass} className="ml-5 mt-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none 
 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center">Delete</button>

  </form>
  </div>
  </div>

    </div>
    </div>
    
  );
}


export default AdminEditSchedule;
