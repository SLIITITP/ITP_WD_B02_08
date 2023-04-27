import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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

  //fetching Subject
  useEffect(() => {
    const fetchSubjects = async () => {
      const response = await axios.get('/api/subject/subjects');
      setSubjects(response.data);
    };
    fetchSubjects();
  }, []);

  //adding subject data
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedTeacherName, setSelectedTeacherName] = useState('');
  const [subjectAdded, setSubjectAdded] = useState(false);

  useEffect(() => {
    // Load all teachers and set them as options in the dropdown
    axios.get('/api/teasub/alltt')
      .then(response => {
        const teachers = response.data;
        const options = teachers.map(teacher => ({ value: teacher._id, label: `${teacher.firstName} ${teacher.lastName}` }));
        setTeacherOptions(options);
        console.log(options)
      })
      .catch(error => console.log(error));
  }, []);

  const handleTeacherChange = selectedOption => {
    // When a teacher is selected, set their ID as the selectedTeacherId state
    setSelectedTeacherId(selectedOption.value);
    setSelectedTeacherName(selectedOption.label);
    console.log(selectedOption.label)
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Create a new subject with the entered details and the selected teacher ID
    const newSubject = {
      subjectName,
      subjectAmount,
      subjectTeacherID: selectedTeacherId,
      subjectTeacherName: selectedTeacherName
    };
    // Send a POST request to the server to add the new subject
    axios.post('/api/subject/add', newSubject)
      .then(response => {
        setSubjectName('');
        setSubjectAmount('');
        setSelectedTeacherId('');
        setSubjectAdded(true);
      })
      .catch(error => console.log(error));
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
    <div className="flex flex-col items-center bg-gradient-to-r from-gray-700 to-gray-300 justify-center h-screen">
      <div className="border-b-2 border-gray-300 mb-8">
        <ul className="flex justify-center rounded-lg bg-white">
          <li className={`${activeTab === 'add' ? 'bg-purple-500 font-bold text-white' : ''} px-4 py-2 cursor-pointer rounded-lg`} onClick={() => handleTabClick('add')}>Add Subject</li>
          <li className={`${activeTab === 'update' ? 'bg-purple-500 font-bold text-white' : ''} px-4 py-2 cursor-pointer rounded-lg`} onClick={() => handleTabClick('update')}>Update Subject</li>
        </ul>
      </div>

      {activeTab === 'add' && (
        <div className="w-1/2 max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-lg font-medium mb-4">Add Subject</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="subjectName" className="block text-gray-700 font-medium mb-2">Subject Name:</label>
              <input type="text" value={subjectName} onChange={event => setSubjectName(event.target.value)} required className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectAmount" className="block text-gray-700 font-medium mb-2">Subject Amount:</label>
              <input type="number" value={subjectAmount} onChange={event => setSubjectAmount(event.target.value)} required className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectTeacherName" className="block text-gray-700 font-medium mb-2">Subject Teacher Name:</label>
              <Select options={teacherOptions} onChange={handleTeacherChange} required className="border border-gray-400 p-2 w-full rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="subjectTeacherID" className="block text-gray-700 font-medium mb-2">Subject Teacher ID:</label>
              <input type="text" value={selectedTeacherId} readOnly required className="border border-gray-400 p-2 w-full rounded" />
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
export default App;
