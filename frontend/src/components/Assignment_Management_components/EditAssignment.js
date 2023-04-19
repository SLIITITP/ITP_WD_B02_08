/* 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditAssignment = () => {
  const [assignment, setAssignment] = useState({});
  const [imageData, setImageData] = useState('');

  const params = useParams();
  
  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const [assignmentResponse, imageResponse] = await Promise.all([
          axios.get(`http://localhost:9090/getAss/${params.id}`),
          axios.get(`http://localhost:9090/getAss/${params.id}`, {
            responseType: 'arraybuffer'
          }),
        ]);

        setAssignment(assignmentResponse.data);
        setImageData(imageResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAssignmentData();
  }, [params.id]); 

  const imageUrl = imageData ? `data:image/jpeg;base64,${btoa(new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), ''))}` : '';

  return (
    <div>
      <h2>Edit Assignment</h2>
      <p>Assignment ID: {assignment._id}</p>
      <p>Assignment Type: {assignment.type}</p>
      <p>Assignment Grade: {assignment.grade}</p>
      <p>Assignment Guidelines: {assignment.guidelines}</p>
      <p>Assignment Deadline: {assignment.deadline}</p>
      <div className="image">
        {imageUrl && <img src={imageUrl} alt="Assignment" style={{ width: '500px', height: 'auto' }} />}
      </div>
    </div>
  );
}

export default EditAssignment; */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditAssignment = () => {
  const [assignment, setAssignment] = useState({});
  const [imageData, setImageData] = useState('');
  const [updatedAssignment, setUpdatedAssignment] = useState({});
  
  const params = useParams();
  
  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const [assignmentResponse, imageResponse] = await Promise.all([
          axios.get(`http://localhost:9090/getAss/${params.id}`),
          axios.get(`http://localhost:9090/getAss/${params.id}`, {
            responseType: 'arraybuffer'
          }),
        ]);

        setAssignment(assignmentResponse.data);
        setImageData(imageResponse.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAssignmentData();
  }, [params.id]); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAssignment(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:9090/updateAss/${params.id}`, updatedAssignment);
      // Handle success, show a success message or redirect to a success page
      console.log('Assignment updated successfully!');
    } catch (error) {
      // Handle error, show an error message or redirect to an error page
      console.log(error);
    }
  }

  const imageUrl = imageData ? `data:image/jpeg;base64,${btoa(new Uint8Array(imageData).reduce((data, byte) => data + String.fromCharCode(byte), ''))}` : '';

  return (
    <div>
      <h2>Edit Assignment</h2>
      <form>
        <p>Assignment ID: {assignment._id}</p>
        <p>Assignment Type: {assignment.type}</p>
        <p>Assignment Grade: {assignment.grade}</p>
        <p>Assignment Guidelines: {assignment.guidelines}</p>
        <p>Assignment Deadline: {assignment.deadline}</p>
        <div className="image">
          {imageUrl && <img src={imageUrl} alt="Assignment" style={{ width: '500px', height: 'auto' }} />}
        </div>
        <label htmlFor="type">Type:</label>
        <input type="text" id="type" name="type" value={updatedAssignment.type || ''} onChange={handleInputChange} />
        <label htmlFor="grade">Grade:</label>
        <input type="text" id="grade" name="grade" value={updatedAssignment.grade || ''} onChange={handleInputChange} />
        <label htmlFor="grade">Subject:</label>
        <input type="text" id="subject" name="subject" value={updatedAssignment.subject || ''} onChange={handleInputChange} />
       
       
       <label htmlFor="guidelines">Guidelines:</label>
        <input type="text" id="guidelines" name="guidelines" value={updatedAssignment.guidelines || ''} onChange={handleInputChange} />
        <label htmlFor="deadline">Deadline:</label>
        <input type="text" id="deadline" name="deadline" value={updatedAssignment.deadline || ''} onChange={handleInputChange} />
        <button type="button" onClick={handleUpdate}>Update</button>
      </form>
    </div>
  );
}

export default EditAssignment;
