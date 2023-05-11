import React, { useState } from 'react';
import axios from 'axios';

function RegForm() {
  const [student, setStudent] = useState({
    studentID: '',
    name: '',
    email: '',
    grade: []
  });

  const handleChange = e => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/students/add', student);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="p-4 bg-gray-200" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="studentID" className="block font-bold mb-2">
          Student ID
        </label>
        <input
          type="text"
          name="studentID"
          id="studentID"
          value={student.studentID}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={student.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={student.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="grade" className="block font-bold mb-2">
          Grade
        </label>
        <input
          type="number"
          name="grade"
          id="grade"
          value={student.grade}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default RegForm;
