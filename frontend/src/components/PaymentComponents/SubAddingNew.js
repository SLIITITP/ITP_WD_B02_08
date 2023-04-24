import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Teacher } from './Teacher'; // import the Teacher model

export const SubAddingNew = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [teachers, setTeachers] = useState([]);
  
  // Fetch the list of teachers from the server
  useEffect(() => {
    axios.get('/api/teachers')
      .then(response => setTeachers(response.data))
      .catch(error => console.log(error));
  }, []);

  const onSubmit = (data) => {
    const { subjectName, subjectAmount, subjectTeacherID } = data;

    // Find the teacher by ID to get the name
    const teacher = teachers.find(t => t.teacherId === subjectTeacherID);
    const subjectTeacherName = teacher ? `${teacher.firstName} ${teacher.lastName}` : '';

    // Create a new subject document using the Subject model
    axios.post('/api/subjects', { subjectName, subjectAmount, subjectTeacherID, subjectTeacherName })
      .then(response => console.log(response.data))
      .catch(error => console.log(error));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="subjectName">Subject Name</label>
        <input type="text" id="subjectName" {...register('subjectName', { required: true })} />
        {errors.subjectName && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="subjectAmount">Subject Amount</label>
        <input type="number" id="subjectAmount" {...register('subjectAmount', { required: true })} />
        {errors.subjectAmount && <span>This field is required</span>}
      </div>
      <div>
        <label htmlFor="subjectTeacherID">Subject Teacher</label>
        <select id="subjectTeacherID" {...register('subjectTeacherID', { required: true })}>
          <option value="">--Select Teacher--</option>
          {teachers.map(teacher => (
            <option key={teacher.teacherId} value={teacher.teacherId}>
              {`${teacher.firstName} ${teacher.lastName}`}
            </option>
          ))}
        </select>
        {errors.subjectTeacherID && <span>This field is required</span>}
      </div>
      <button type="submit">Add Subject</button>
    </form>
  );
};
