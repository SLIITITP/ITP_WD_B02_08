/* import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditAssignment = () => {
  const [assignment, setAssignment] = useState({});

  const params = useParams();
  console.log(params.id)
  //const { assignmentId } = useParams().id;


 


  useEffect(() => {
    const fetchAssignmentData = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/getAss/${params.id}`);
        setAssignment(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAssignmentData();
  }, [params.id]); 



  // Render the specific assignment data
  return (
    <div>
      <h2>Edit Assignment</h2>
      <p>Assignment ID: {assignment._id}</p>
      <p>Assignment Type: {assignment.type}</p>
      <p>Assignment Grade: {assignment.grade}</p>
      <p>Assignment Guidelines: {assignment.guidelines}</p>
      <p>Assignment Dealine: {assignment.deadline}</p>
      
    </div>
  );
}

export default EditAssignment;
 */

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

export default EditAssignment;