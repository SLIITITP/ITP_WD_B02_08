import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddClass() {

 //set subject list getting from DB
 const [subjectList, setSubjectList] = useState([]);
 const [subjects, setSubjects] = useState([]);
 const [subjectOptions, setSubjectOptions] = useState([]);
 const [selectedOptionValue, setSelectedOptionValue] = useState('');
 const [teacherName, setTeacherName] = useState([]);
 //set selected subjects
 const [selectedSubject, setSelectedSubject] = useState([]);

  const [formData, setFormData] = useState({
    grade: "",
    subject: "",
    teacher: "",
    hall: "",
    date: "",
    time: "",
    fees: "",
  });

  const [errors, setErrors] = useState({
    grade: "",
    subject: "",
    teacher: "",
    hall: "",
    date: "",
    time: "",
    fees: "",
  });

//getting subject details and fetch
useEffect(() => {
  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/subject/subjects');
      setSubjects(response.data);
      const subjectNames = response.data.map((subject) => `${subject.subjectName} - ${subject.subjectTeacherName}`);
      setSubjectOptions(subjectNames);
    } catch (error) {
      toast.error(error);
    }
  };
  fetchSubjects();
}, []);

//Add New Class
  function handleSubmit(event) {
    event.preventDefault();

    // Check if all fields are filled out
    if (
      !formData.grade ||
      !formData.subject||
      !formData.teacher ||
      !formData.hall ||
      !formData.date ||
      !formData.time ||
      !formData.fees
    ) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Validate the time format (HH:MM am/pm - HH:MM am/pm)
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s(am|pm)\s-\s(0?[1-9]|1[0-2]):[0-5]\d\s(am|pm)$/;
    if (!timeRegex.test(formData.time)) {
      toast.error("Please enter a valid time (HH:MM am/pm - HH:MM am/pm).");
    return;
    }

    axios
      .post("http://localhost:9090/class/addClass", formData)
      .then(() => {
        toast.success("Class Added Successfully!!");
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    
      // Update form data
  setFormData({ ...formData, [name]: value });

  // Reset the corresponding error message
  setErrors({ ...errors, [name]: "" });

    if (name === "subject") {
      console.log(value);
      const [subjectName, subjectTeacherName] = value.split(' - ');
      const selectedSubject = subjects.find(subject => subject.subjectName === subjectName && subject.subjectTeacherName === subjectTeacherName);
      console.log(selectedSubject);
      setFormData({ ...formData, subject: value, teacher: subjectTeacherName , fees: selectedSubject.subjectAmount
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s(am|pm)\s-\s(0?[1-9]|1[0-2]):[0-5]\d\s(am|pm)$/;
    // if (name === "time") {
    // if (!timeRegex.test(formData.time)) {
    //   setErrors((prevErrors) => ({
    //     ...prevErrors,
    //     [name]: "Please enter a valid time (HH:MM am/pm - HH:MM am/pm).",
    //   }));  
    // return;
    // }else {
    //   // Hide the error message for time field when reset to valid format
    //     setErrors((prevErrors) => ({
    //       ...prevErrors,
    //       [name]: "",
    //     }));
    // }
   }



//Add New Class Form Input field (Avoid duplicating)
function renderInput(name, label, placeholder) {
 
  const gradeOptions = ["1", "2","3", "4","5","6","7","8","9","10","11","Other"];
  const hallOptions = ["H01", "H02", "H03", "H04", "H05", "H06", "H07", "Other"];
  
  const options = name === "grade" ? gradeOptions : name === "subject" ? subjectOptions : hallOptions;


  return (
    <div className="col-md-12 mb-2 d-flex items-center justify-center">
      <label htmlFor={name} className="mr-2">
        {label}:
      </label>

      {name === "grade"|| name === "subject" || name === "hall" ? (
        <select
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
          focus:ring-2 sm:text-sm sm:leading-6"
          name={name}
          onChange={handleInputChange}
          value={formData[name]}
          required={true}
        >
          <option value="">--Select {label}--</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option === "Other" ? option : option}
            </option>
          ))}
          {/* {errors[name] && <span className="text-red-500">{errors[name]}</span>} */}  
        </select>
            
      )
 
      :(
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
          focus:ring-2 sm:text-sm sm:leading-6"
          name={name}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={formData[name]}
          required= {true}
          readOnly={name === "teacher" || name === "fees"}
        >
         
          {/* {errors[name] && <span className="text-red-500">{errors[name]}</span>} */}
        </input>       
      )}

    </div>
  );
}

return (
    <div className="container mt-5 ml-4">
      <div className="items-center justify-center">
        
        <h3 className="mt-3 mb-4 font-medium text-2xl text-gray-900 dark:text-white">Class Schedule Allocation</h3>
        <form className="col-5" onSubmit={handleSubmit}>
          {renderInput("grade", "Grade", "Enter Grade")}
          {renderInput("subject", "Subject", "Enter Subject")}
          {renderInput("teacher", "Teacher", "Teacher's Name")}
          {renderInput("hall", "Hall", "Enter Hall No")}
          {renderInput("date", "Date", "Enter Date")}
          {renderInput("time", "Time", "Enter Time  (HH:MM am/pm - HH:MM am/pm)")}
          {renderInput("fees", "Fees", "Fees")}

          <button
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center"
          >
            Submit
          </button>
        </form>

      </div>
      <ToastContainer/>
    </div>

  );
}

export default AddClass;
