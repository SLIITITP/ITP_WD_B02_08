import React, { useState } from "react";
import axios from "axios";

function AddClass() {
  const [formData, setFormData] = useState({
    grade: "",
    subject: "",
    teacher: "",
    hall: "",
    date: "",
    time: "",
    fees: "",
  });

//Add New Class
  function handleSubmit(event) {
    event.preventDefault();

    if (
      !formData.grade ||
      !formData.subject ||
      !formData.teacher ||
      !formData.hall ||
      !formData.date ||
      !formData.time ||
      !formData.fees
    ) {
      alert("Please fill out all fields.");
      return;
    }

    // Check if all fields are filled out
  for (const field in formData) {
    if (!formData[field]) {
      alert("Please fill out all fields.");
      return;
    }
  }

  // Validate the date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(formData.date)) {
    alert("Please enter a valid date (YYYY-MM-DD).");
    return;
  }

  // Validate the time format (HH:MM am/pm - HH:MM am/pm)
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5]\d\s(am|pm)\s-\s(0?[1-9]|1[0-2]):[0-5]\d\s(am|pm)$/;
  if (!timeRegex.test(formData.time)) {
    alert("Please enter a valid time (HH:MM am/pm - HH:MM am/pm).");
    return;
  }


    axios
      .post("http://localhost:9090/class/addClass", formData)
      .then(() => {
        alert("Class Added");
      })
      .catch((err) => {
        alert(err);
      });
  }

//Add New Class Form onchange (Avoid duplicating)
function handleInputChange(event) {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
}

//Add New Class Form Input field (Avoid duplicating)
  function renderInput(name, label, placeholder) {
    return (
      <div className="col-md-12 mb-2 d-flex items-center justify-center">
        <label htmlFor={name} className="mr-2">
          {label}:
        </label>
        <input
          type="text"
          className="block w-full rounded-md border-0 py-1.5 pl-5 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
          focus:ring-2 sm:text-sm sm:leading-6"
          name={name}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={formData[name]}
        />
      </div>
    );
  }

  return (
    <div className="container mt-5 ml-4">
      <div className="items-center justify-center">
        
        <h3 className="mt-3 mb-4 font-medium text-2xl text-gray-900 dark:text-white">Add New Class</h3>
        <form className="col-5" onSubmit={handleSubmit}>
          {renderInput("grade", "Grade", "Enter Grade")}
          {renderInput("subject", "Subject", "Enter Subject")}
          {renderInput("teacher", "Teacher", "Enter Teacher's Name")}
          {renderInput("hall", "Hall", "Enter Hall No")}
          {renderInput("date", "Date", "Enter Date")}
          {renderInput("time", "Time", "Enter Time  (HH.MM am/pm - HH.MM am/pm)")}
          {renderInput("fees", "Fees", "Enter Fees")}

          <button
            type="submit"
            className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center"
          >
            Submit
          </button>
        </form>

      </div>
    </div>

  );
}

export default AddClass;
