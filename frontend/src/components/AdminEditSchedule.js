import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimetableSideNav from "./TimetableSideNav";
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
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fees, setFees] = useState("");

  function sendData(e) {
    e.preventDefault();
  
    const updatedClass = {
      grade,
      subject,
      teacher,
      hall,
      date,
      time,
      fees
    };
  
    axios.put(`http://localhost:9090/class/updateClass/`, updatedClass)
      .then(() => {
        alert("Class updated");
      })
      .catch((err) => {
        alert(err.message);
      });
  }
//Click to edit class details
const [selectedClass, setSelectedClass] = useState(null);

function handleClassClick(clz) {
  setSelectedClass({
    subject: clz.subject,
    teacher: clz.teacher,
    hall: clz.hall,
    date: clz.date,
    time: clz.time,
    fees: clz.fees
  });
}


  return (
    
    <div className="container my-5 " style={{ maxWidth: "1600px"}}>
        <TimetableSideNav/>
    <div className="row" >
      {/*View timetable*/}
      <div class="col-7" style={{marginLeft:"200px"}}>
      <h3 className="mb-4">All Classes</h3>
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
          <thead>
            <tr>
              <th>Subject</th>
              <th>Teacher</th>
              <th>Hall</th>
              <th>Date</th>
              <th>Time</th>
              <th>Fees</th>
            </tr>
          </thead>
          <tbody>
            {classes
              .filter((clz) => clz.grade === activeGrade)
              .map((clz) => (
                <tr key={clz._id} onClick={() => handleClassClick(clz)}>
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

  {/*Add Classes*/}
  <div class="col" >
  <h3 className="text-center mb-4">Edit Class Details</h3> 
  <div className="container">
  <form onSubmit={sendData}>
  <div className="row">
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="grade" className="mr-2">Grade:</label>
    <input type="text" className="form-control" id="grade" placeholder="" value={activeGrade} readOnly />
  </div>
  </div>
  
  <div className="row">
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="Subject" className="mr-2">Subject:</label>
      <input type="text" className="form-control" id="subject" placeholder={selectedClass ? selectedClass.subject : "Subject"}
        onChange={(e) => {
          setSubject(e.target.value);
        }} 
      />
    </div>
  </div>
  
  <div className="row">
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="Teacher" className="mr-2">Teacher:</label>
      <input type="text" className="form-control" id="teacher" placeholder={selectedClass ? selectedClass.teacher : "Teacher's Name"}
        onChange={(e) => {
          setTeacher(e.target.value);
        }} 
      />
    </div>
  </div>
  
  <div className="row">
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="HallNo" className="mr-2">Hall:</label>
      <input type="text" className="form-control" id="hall" placeholder={selectedClass ? selectedClass.hall : "Hall No"}
        onChange={(e) => {
          setHall(e.target.value);
        }} 
      />
    </div>
  </div>
  
  <div className="row">
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="Date" className="mr-2">Date:</label>
      <input type="text" className="form-control" id="date" placeholder={selectedClass ? selectedClass.date : "Date"}
        onChange={(e) => {
          setDate(e.target.value);
        }} 
      />
    </div>
  </div>
  
  <div className="row">
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="Time" className="mr-2">Time:</label>
      <input type="text" className="form-control" id="time" placeholder={selectedClass ? selectedClass.time: "Time"}
        onChange={(e) => {
          setTime(e.target.value);
        }} 
      />
    </div>
  </div>
  
  <div className="row">
  <div className="col-md-12 mb-3 d-flex align-items-center">
    <label htmlFor="Fees" className="mr-2">Fees:</label>
      <input type="text" className="form-control" id="fees" placeholder={selectedClass ? selectedClass.fees : "Fees"}
        onChange={(e) => {
          setFees(e.target.value);
          }} />
  </div>

  </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      </div>
      </div>

    </div>
    </div>
    
  );
}


export default AdminEditSchedule;
