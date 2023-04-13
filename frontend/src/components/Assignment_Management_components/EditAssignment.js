import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAssignment = (props) => {
  const [assignment, setAssignment] = useState({
    type: '',
    grade: '',
    guidelines: '',
    deadline: '',
    image: '',
  });

  useEffect(() => {
    // Fetch assignment data from API endpoint only if props.match.params.id is defined
    if (props.match && props.match.params && props.match.params.id) {
      axios.get(`http://localhost:9090/getAss/${props.match.params.id}`)
        .then(res => {
          // Update state with fetched assignment data
          setAssignment(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [props.match]);

  const handleChange = (e) => {
    // Update assignment state with form input changes
    setAssignment({ ...assignment, [e.target.name]: e.target.value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update assignment data to API endpoint only if props.match.params.id is defined
      if (props.match && props.match.params && props.match.params.id) {
        await axios.put(`/updateAss/${props.match.params.id}`, assignment); // Replace with your API endpoint for updating assignments
        console.log('Assignment updated successfully');
      }
    } catch (error) {
      console.error('Failed to update assignment:', error);
    }
  }

  return (
   <div className='container'>
      <h2>Edit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type:</label>
          <input type="text" className="form-control" id="type" name="type" value={assignment.type} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade:</label>
          <input type="text" className="form-control" id="grade" name="grade" value={assignment.grade} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="guidelines">Guidelines:</label>
          <textarea className="form-control" id="guidelines" name="guidelines" value={assignment.guidelines} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input type="date" className="form-control" id="deadline" name="deadline" value={assignment.deadline} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input type="file" className="form-control" id="image" name="image" value={assignment.image} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditAssignment;

