import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [activeTab, setActiveTab] = useState('add');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  }

  //for adding subject
  const [subjectName, setSubjectName] = useState('');
  const [subjectAmount, setSubjectAmount] = useState(0);
  const [subjectTeacherID, setSubjectTeacherID] = useState('');
  const [subjectTeacherName, setSubjectTeacherName] = useState('');

  //for update
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectID, setSubjectID] = useState('');

  //adding subject data
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/subject/add', {
        subjectName,
        subjectAmount,
        subjectTeacherID,
        subjectTeacherName,
      });
      console.log(response.data);
      setSubjectName('');
      setSubjectAmount(0);
      setSubjectTeacherID('');
      setSubjectTeacherName('');
    } catch (error) {
      console.error(error);
    }
  };

  //Updating Subject
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get('/api/subject/subjects');
      setSubjects(response.data);
    };
    fetchSubjects();
  }, []);

  // const handleSubjectClick = (subject) => {
  //   setSelectedSubject(subject);
  //   setSubjectName(subject.subjectName);
  //   setSubjectAmount(subject.subjectAmount);
  //   setSubjectTeacherID(subject.subjectTeacherID);
  //   setSubjectTeacherName(subject.subjectTeacherName);
  // };

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
      subjectAmount: subjectAmount,
      subjectTeacherID: subjectTeacherID,
      subjectTeacherName: subjectTeacherName
    };
    try {
      const response = await axios.put(`/api/subject/update/${selectedSubject._id}`, updatedSubject);
      console.log(response.data);
      setSelectedSubject(null);
      setSubjectName('');
      setSubjectAmount(0);
      setSubjectTeacherID('');
      setSubjectTeacherName('');
    } catch (err) {
      console.error(err);
    }
  };

  console.log(selectedSubject)

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="border-b-2 border-gray-300 mb-8">
        <ul className="flex justify-center">
          <li className={`${activeTab === 'add' ? 'bg-gray-200' : ''} px-4 py-2 cursor-pointer`} onClick={() => handleTabClick('add')}>Add Subject</li>
          <li className={`${activeTab === 'update' ? 'bg-gray-200' : ''} px-4 py-2 cursor-pointer`} onClick={() => handleTabClick('update')}>Update Subject</li>
        </ul>
      </div>

      {activeTab === 'add' && (
        <div className="w-1/2 max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-4">Add Subject</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="subjectName" className="block text-gray-700 font-medium mb-2">Subject Name:</label>
              <input type="text" value={subjectName} onChange={(e) => setSubjectName(e.target.value)} required className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectAmount" className="block text-gray-700 font-medium mb-2">Subject Amount:</label>
              <input type="number" value={subjectAmount} onChange={(e) => setSubjectAmount(e.target.value)} required className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectTeacherID" className="block text-gray-700 font-medium mb-2">Subject Teacher ID:</label>
              <input type="text" value={subjectTeacherID} onChange={(e) => setSubjectTeacherID(e.target.value)} required className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectTeacherName" className="block text-gray-700 font-medium mb-2">Subject Teacher Name:</label>
              <input type="text" value={subjectTeacherName} onChange={(e) => setSubjectTeacherName(e.target.value)} required className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600">Add Subject</button>
          </form>
        </div>
      )}

      {activeTab === 'update' && (
        <div className="w-1/2 max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-4">Update Subject</h2>
          <form onSubmit={handleUpdate}>
            <div className="mb-4">
              <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">Subject:</label>
              <select id="subjects" onChange={handleSubjectChange} className="border border-gray-400 p-2 w-full rounded">
                <option value="">Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subjectName} ({subject.subjectID}) - {subject.subjectTeacherName}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="subjectID" className="block text-gray-700 font-medium mb-2">Subject Teacher Name:</label>
              <input type="text" value={subjectID} readOnly className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectAmount" className="block text-gray-700 font-medium mb-2">Subject Teacher Name:</label>
              <input type="number" value={subjectAmount} onChange={(e) => setSubjectAmount(e.target.value)} className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectTeacherName" className="block text-gray-700 font-medium mb-2">Subject Teacher Name:</label>
              <input type="text" value={subjectTeacherName} onChange={(e) => setSubjectTeacherName(e.target.value)} className="border border-gray-400 p-2 w-full rounded" />
            </div>
          </form>
          <button type='submit' onClick={handleUpdate} className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600">Add Subject</button>
          <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600">Add Subject</button>
        </div>
      )}
    </div>
  )
}
export default App;
