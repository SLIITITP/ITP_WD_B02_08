// import React from 'react'
// import { Link} from 'react-router-dom';


// export default function NipTest() {


//   return (
//     <div>NipTest<br/>
//       <Link to={'/viewPayment'}><button>ViewPayment</button><br/></Link>
//       <Link to={'/addPayment'}><button>AddPayment</button><br/></Link>
//       <Link to={'/salary/calculate'}><button>SalaryCalculation</button><br/></Link>
//       <Link to={'/salary/history'}><button>SalaryHistory</button><br/></Link>
//       <Link to={'/am/add'}><button>AM add</button><br/></Link>
//       <Link to={'/am/check'}><button>AM check</button><br/></Link>
//       <Link to={'/payment/addSubToTeachers'}><button>SUBJECT ADDING</button><br/></Link>
//       <Link to={'/subject/update'}><button>SUBJECT UPDATING</button><br/></Link>
//       <Link to={'/payOnline'}><button>PAY ONLINE</button><br/></Link>
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function SubListUpdate() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectName, setSubjectName] = useState('');
  const [subjectID, setSubjectID] = useState('');
  const [subjectAmount, setSubjectAmount] = useState(0);
  const [subjectTeacherID, setSubjectTeacherID] = useState('');
  const [subjectTeacherName, setSubjectTeacherName] = useState('');

  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get('/api/subject/subjects');
      setSubjects(response.data);
    };
    fetchSubjects();
  }, []);

  const handleSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    const subject = subjects.find((subject) => subject._id === selectedSubjectId);
    setSelectedSubject(subject);
    setSubjectName(subject.subjectName);
    setSubjectID(subject.subjectID);
    setSubjectAmount(subject.subjectAmount);
    setSubjectTeacherID(subject.subjectTeacherID);
    setSubjectTeacherName(subject.subjectTeacherName);
  };

  const handleUpdate = async () => {
    const updatedSubject = {
      ...selectedSubject,
      subjectName: subjectName,
      subjectID: subjectID,
      subjectAmount: subjectAmount,
      subjectTeacherID: subjectTeacherID,
      subjectTeacherName: subjectTeacherName
    };
    try {
      const response = await axios.put(`/api/subject/update/${selectedSubject._id}`, updatedSubject);
      console.log(response.data);
      setSelectedSubject(null);
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
    <div>
      <h1>Subjects</h1>
      <label htmlFor="subjects">Select a subject:</label>
      <select id="subjects" onChange={handleSubjectChange}>
        <option value="">Select a subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.subjectName} ({subject.subjectID})
          </option>
        ))}
      </select>
      {selectedSubject && (
        <div>
          <h2>Edit Subject</h2>
          <form onSubmit={handleUpdate}>
            <label>
              Subject Name:
              <input type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
            </label>
            <label>
              Subject ID:
              <input type="text" value={subjectID} onChange={(e) => setSubjectID(e.target.value)} />
            </label>
            <label>
              Subject Amount:
              <input type="number" value={subjectAmount} onChange={(e) => setSubjectAmount(e.target.value)} />
            </label>
            <label>
              Subject Teacher Name:
              <input type="text" value={subjectTeacherName} onChange={(e) => setSubjectTeacherName(e.target.value)} />
            </label>

            <button type="submit">Update Subject</button>
          </form>
        </div>
      )}
    </div>
  );
}
