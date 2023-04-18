import React, { useState } from 'react';
import axios from 'axios';

const AssignmentDetails = ({ assignment, onClose, onSave }) => {
  const [type, setType] = useState(assignment.type);
  const [grade, setGrade] = useState(assignment.grade);
  const [guidelines, setGuidelines] = useState(assignment.guidelines);
  const [deadline, setDeadline] = useState(assignment.deadline);
  const [image, setImage] = useState(assignment.image);

  const handleTypeChange = (e) => {
    setType(e.target.value);
  }

  const handleGradeChange = (e) => {
    setGrade(e.target.value);
  }

  const handleGuidelinesChange = (e) => {
    setGuidelines(e.target.value);
  }

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  }

  const handleImageChange = (e) => {
    setImage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the updated assignment object
    const updatedAssignment = {
      ...assignment,
      type,
      grade,
      guidelines,
      deadline,
      image
    };

    // Call the onSave callback function with the updated assignment object
    onSave(updatedAssignment);
  }

  const onSavee = () => {
    const id = this.props.match.params.id;

    if(id  == null){
      console.log("null")
    }
    else{
      const data = {
        type: type,
        grade: grade,
        guidelines: guidelines,
        deadline: deadline,
        image: image
    }

    console.log(data);
    axios.put(`http://localhost:9090/updateAss/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Assignment Updated Successfully")
        setType("");
        setGrade("");
        setGuidelines("");
        setDeadline("");
        setImage("");
      }
    })

    
    }
    

  
  }

  return (
    <div className="assignment-details">
      <h2>Assignment Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input type="text" className="form-control" id="type" value={type} onChange={handleTypeChange} />
        </div>
        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <input type="text" className="form-control" id="grade" value={grade} onChange={handleGradeChange} />
        </div>
        <div className="form-group">
          <label htmlFor="guidelines">Guidelines</label>
          <input type="text" className="form-control" id="guidelines" value={guidelines} onChange={handleGuidelinesChange} />
        </div>
      

        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input type="text" className="form-control" id="deadline" value={deadline} onChange={handleDeadlineChange} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input type="text" className="form-control" id="image" value={image} onChange={handleImageChange} />
        </div>
        <button className="btn btn-primary" onClick={onSavee} >Save</button>


        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
      </form>
    </div>
  );
}

export default AssignmentDetails;
