import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddSubToTeachers() {
  const [activeTab, setActiveTab] = useState('add');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSubjectName('');
    setSubjectAmount(0);
    setSubjectID('');
    setSubjectTeacherID('');
    setSubjectTeacherName('');
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

  //Updating Subject
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get('/api/subject/subjects');
      setSubjects(response.data);
    };
    fetchSubjects();
  }, []);

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
      // console.log(response.data);
      toast.success("Subject added successfully!");
      setSubjectName('');
      setSubjectID('');
      setSubjectAmount(0);
      setSubjectTeacherID('');
      setSubjectTeacherName('');

      // fetch the updated list of subjects
      const updatedResponse = await axios.get('/api/subject/subjects');
      setSubjects(updatedResponse.data);
    } catch (error) {
      console.error(error);
      toast.error("Subject Adding Error!");
    }
  };

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
    console.log('working')
    const updatedSubject = {
      ...selectedSubject,
      subjectName: subjectName,
      subjectAmount: subjectAmount,
      subjectTeacherID: subjectTeacherID,
      subjectTeacherName: subjectTeacherName
    };
    try {
      const response = await axios.put(`/api/subject/update/${selectedSubject._id}`, updatedSubject);
      //console.log(response.data);
      toast.success("Subject Updated successfully!");
      setSelectedSubject(null);
      setSubjectName('');
      setSubjectID('');
      setSubjectAmount(0);
      setSubjectTeacherID('');
      setSubjectTeacherName('');

      // fetch the updated list of subjects
      const updatedResponse = await axios.get('/api/subject/subjects');
      setSubjects(updatedResponse.data);
    } catch (err) {
      console.error(err);
      toast.error("Subject Updating Error!");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/subject/delete/${selectedSubject._id}`);
      toast.success("Subject deleted successfully!");
      setSelectedSubject(null);
      setSubjectName('');
      setSubjectID('');
      setSubjectAmount(0);
      setSubjectTeacherID('');
      setSubjectTeacherName('');

      // fetch the updated list of subjects
      const updatedResponse = await axios.get('/api/subject/subjects');
      setSubjects(updatedResponse.data);
    } catch (err) {
      console.error(err);
      toast.error("Subject deleting Error!");
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-300 justify-center h-screen">
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
            <div className='flex justify-center'>
              <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600">Add Subject</button>
            </div>
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
                <option value='' >Select a subject</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.subjectName} ({subject.subjectID}) - {subject.subjectTeacherName}-{subject.subjectTeacherID}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="subjectID" className="block text-gray-700 font-medium mb-2">Subject ID:</label>
              <input type="text" value={subjectID} readOnly className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectAmount" className="block text-gray-700 font-medium mb-2">Subject Amount:</label>
              <input type="number" value={subjectAmount} onChange={(e) => setSubjectAmount(e.target.value)} className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectTeacherName" className="block text-gray-700 font-medium mb-2">Subject Teacher Name:</label>
              <input type="text" value={subjectTeacherName} onChange={(e) => setSubjectTeacherName(e.target.value)} className="border border-gray-400 p-2 w-full rounded" />
            </div>
          </form>
          <div className='flex flex-wrap -mx-3 mb-2 p-2 text-md font-semibold'>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button onClick={(e) => {
                if (window.confirm("Are you sure you want to confirm?")) {
                  handleUpdate(e);
                }
              }}
                className='w-full text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >UPDATE</button>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button onClick={handleDelete}
                className='w-full text-white bg-red-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md p-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >DELETE</button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  )
}
export default AddSubToTeachers;
