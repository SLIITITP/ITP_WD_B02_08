import React from 'react';

const SubjectRelated = () => {
  return (
    <div>
      <h1>Subject Related Component</h1>
    </div>
  );
}

export default SubjectRelated;

/* 
<div class="mb-3">
  <label class="form-label" for="assignment-type">Assignment Type:</label>
  <div>
    <input type="radio" id="assignment-home" name="assignment-type" value="Home Work" checked={assignmentType === 'Home Work'} onChange={(e) => setAssignmentType(e.target.value)} />
    <label for="assignment-home">Home Work</label>
  </div>
  <div>
    <input type="radio" id="assignment-group" name="assignment-type" value="Group Work" checked={assignmentType === 'Group Work'} onChange={(e) => setAssignmentType(e.target.value)} />
    <label for="assignment-group">Group Work</label>
  </div>
  <div>
    <input type="radio" id="assignment-subject" name="assignment-type" value="Subject Related" checked={assignmentType === 'Subject Related'} onChange={(e) => setAssignmentType(e.target.value)} />
    <label for="assignment-subject">Subject Related</label>
  </div>
  <div>
    <input type="radio" id="assignment-extra" name="assignment-type" value="Extra Work" checked={assignmentType === 'Extra Work'} onChange={(e) => setAssignmentType(e.target.value)} />
    <label for="assignment-extra">Extra Work</label>
  </div>
  {formErrors.assignmentType && <div className="error">{formErrors.assignmentType}</div>}
</div>
 */