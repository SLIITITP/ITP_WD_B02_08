import React, { useState } from 'react';
import axios from 'axios';

export default function AddSubToTeachers() {

  const [subjectName, setSubjectName] = useState('');
  const [subjectID, setSubjectID] = useState('');
  const [subjectAmount, setSubjectAmount] = useState(0);
  const [subjectTeacherID, setSubjectTeacherID] = useState('');
  const [subjectTeacherName, setSubjectTeacherName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newSubject = {
      subjectName: subjectName,
      subjectID: subjectID,
      subjectAmount: subjectAmount,
      subjectTeacherID: subjectTeacherID,
      subjectTeacherName: subjectTeacherName
    };
    try {
      const response = await axios.post('/api/subject/add', newSubject);
      console.log(response.data);
      setSubjectName('');
      setSubjectID('');
      setSubjectAmount(0);
      setSubjectTeacherID('');
      setSubjectTeacherName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Subject Name:
        <input type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required />
      </label><br />
      <label>
        Subject ID:
        <input type="text" value={subjectID} onChange={(e) => setSubjectID(e.target.value)} required />
      </label><br />
      <label>
        Subject Amount:
        <input type="number" value={subjectAmount} onChange={(e) => setSubjectAmount(e.target.value)} required />
      </label><br />
      <label>
        Subject Teacher ID:
        <input type="text" value={subjectTeacherID} onChange={(e) => setSubjectTeacherID(e.target.value)} required />
      </label><br />
      <label>
        Subject Teacher Name:
        <input type="text" value={subjectTeacherName} onChange={(e) => setSubjectTeacherName(e.target.value)} required />
      </label><br />
      <button type="submit">Add Subject</button>
    </form>
  );
}
