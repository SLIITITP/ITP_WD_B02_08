import React, { useState, useEffect } from 'react';

function AddAmNip() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [subjectID, setSubjectID] = useState('');
  const [studentID, setStudentID] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  // Fetch subjects and students on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch subjects
        const subjectResponse = await fetch('/api/subject/subjects');
        const subjectData = await subjectResponse.json();
        setSubjects(subjectData);

        // Fetch students
        const studentResponse = await fetch('/api/user/list');
        const studentData = await studentResponse.json();
        setStudents(studentData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Send POST request to add AmNip data
      const response = await fetch('/api/amnip/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          time,
          subjectID,
          studentID
        })
      });

      // Handle response
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="subject">Subject:</label>
        <select
          id="subject"
          value={subjectID}
          onChange={(event) => setSubjectID(event.target.value)}
          required
        >
          <option value="">-- Select a subject --</option>
          {subjects.map((subject) => (
            <option key={subject._id} value={subject.subjectID}>
              {subject.subjectName}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="student">Student:</label>
        <select
          id="student"
          value={studentID}
          onChange={(event) => setStudentID(event.target.value)}
          required
        >
          <option value="">-- Select a student --</option>
          {students.map((student) => (
            <option key={student._id} value={student.studentID}>
              {student.studentName}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Add AmNip Data</button>
    </form>
  );
}

export default AddAmNip;