import React, { useState } from "react";
import axios from "axios";
import TimetableSideNav from "./TimetableSideNav";

function AddClass() {

  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [teacher, setTeacher] = useState("");
  const [hall, setHall] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [fees, setFees] = useState("");

  function sendData(e){
    e.preventDefault();
    
    const newClass={
        grade,
        subject,
        teacher,
        hall,
        date,
        time,
        fees
    }
     
    axios.post("http://localhost:9090/class/addClass",newClass).then(()=>{
      alert("Class Added")
    }).catch((err)=>{
      alert(err)
    })

  }

  return (

    <div className="container my-5">
        <TimetableSideNav/>
      <h3>Add New Class</h3>  
      <form onSubmit={sendData}>
        <div className="mb-3">
          <label htmlFor="grade" className="form-label">Grade</label>
          <input type="text" className="form-control" id="grade" placeholder="Enter Grade" 
          onChange={(e) =>{
            setGrade(e.target.value);
          }} />

        </div>
        <div className="mb-3">
          <label htmlFor="subject" className="form-label">Subject</label>
          <input type="text" className="form-control" id="subject" placeholder="Enter Subject" 
          onChange={(e) =>{
            setSubject(e.target.value);
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="teacher" className="form-label">Teacher</label>
          <input type="text" className="form-control" id="teacher" placeholder="Enter Teacher's Name" 
          onChange={(e) =>{
            setTeacher(e.target.value);
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="hall" className="form-label">Hall No</label>
          <input type="text" className="form-control" id="hall" placeholder="Enter Hall No" 
          onChange={(e) =>{
            setHall(e.target.value);
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input type="text" className="form-control" id="date" placeholder="Enter Date" 
          onChange={(e) =>{
            setDate(e.target.value);
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="Time" className="form-label">Time</label>
          <input type="text" className="form-control" id="time" placeholder="Enter Time" 
          onChange={(e) =>{
            setTime(e.target.value);
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="Fees" className="form-label">Fees</label>
          <input type="text" className="form-control" id="fees" placeholder="Enter Fees" 
          onChange={(e) =>{
            setFees(e.target.value);
          }} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

    </div>




  )
}


export default AddClass;