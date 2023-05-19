import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card, Col, Input, Row, Typography } from 'antd';
import QRCode from 'qrcode';
import jsQR from 'jsqr';

function GetAm() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [subjectID, setSubjectID] = useState('');
  const [studentID, setStudentID] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [grade, setGrade] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [payments, setPayments] = useState([]);
  const [currMonth, setCurrMonth] = useState('');
  const [paidForMonth, setPaidForMonth] = useState(false);

  //QR Generator
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultWebCam, setScanResultWebCam] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Set date and time automatically
  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().slice(0, 10));
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    setTime(`${hours}:${minutes}`);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentMonth = monthNames[now.getMonth()];
    setCurrMonth(currentMonth);
  }, []);


  useEffect(() => {
    const constraints = { video: { facingMode: 'environment' } };
    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(text);
      setImageUrl(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorWebCam = (error) => {
    console.log(error);
  };

  const handleScanWebCam = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
  
    if (!video || !canvas) {
      // Handle the error here, such as displaying an error message or taking alternative action
      console.error('Video or canvas element is null.');
      return;
    }
  
    const ctx = canvas.getContext('2d');
  
    if (!ctx) {
      // Handle the error here, such as displaying an error message or taking alternative action
      console.error('Could not get 2D context of the canvas.');
      return;
    }
  
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      setScanResultWebCam(code.data);
      setSearchTerm(code.data);
      handleSearch(code.data);
      setSelectedStudent(code.data);
      setShowDropdown(false);
      setStudentID(code.data)
      requestAnimationFrame(handleScanWebCam);
    } else {
      setTimeout(() => {
        requestAnimationFrame(handleScanWebCam); // Request next frame after delay
      }, 1500); // Delay of 1500 milliseconds (1.5 seconds)
    }
  };

  
  //End of QR Generater


  // Fetch subjects and students on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch subjects
        const subjectResponse = await fetch('/api/subject/subjects');
        const subjectData = await subjectResponse.json();
        setSubjects(subjectData);

        // Fetch students
        const studentResponse = await fetch('/api/user/list');
        const studentData = await studentResponse.json();
        setStudents(studentData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  //get SubID by searching subjectID
  const subID = subjects.find(subject => subject.subjectID === subjectID);

  const STD = students.find(std => std.studentID === studentID);
  console.log(STD);


  const handleSearch = (studentID) => {
    fetch(`http://localhost:9090/api/payment/history/${studentID}`)
      .then(response => response.json())
      .then(data => {
        setPayments(data);
        // console.log(data);
        const paymentForSubject = data.filter(payment => payment.subjectsIDs.includes(subID._id));
        // console.log('payments htmlFor selected subject',paymentForSubject);
        const filterGrade = paymentForSubject.filter(payment => payment.grade.includes(grade));
        // console.log(filterGrade)
        const pm = filterGrade.filter(payment => payment.month.includes(currMonth));
        // console.log(pm);
        if (pm.length > 0) {
          setPaidForMonth(true);
          console.log('true')
        } else {
          setPaidForMonth(false);
          console.log('false')
        }

      })
      .catch(error => {
        console.error(error);
        setPaidForMonth(false);
      });
  };
  console.log(subjectID)

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      // Send POST request to add AmNip data
      const response = await fetch('/api/amnip/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          time,
          subjectID,
          studentID,
          grade
        })
      });

      // Handle response
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.error);
        toast.error("Already Added");
      } else {
        toast.success("Attendance added successfully!");
        setSearchTerm('');
        console.log('Attendance Added')
      }

    } catch (error) {
      console.error(error);
      toast.error('server error', error)
    }
  }

  //Search student by ID or name
  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setSearchTerm(student.studentID);
    setShowDropdown(false);
    setStudentID(student.studentID)
    handleSearch(student.studentID);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentID.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div className="h-full w-full flex text-lg font-medium text-gray-900 dark:text-white">
      <div className='w-2/3 bg-gray-300 p-4 pt-2'>
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="date" className="block font-medium text-gray-700">Date:</label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="time" className="block font-medium text-gray-700">Time:</label>
              <input
                type="time"
                id="time"
                value={time}
                onChange={(event) => setTime(event.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block font-medium text-gray-700">Subject:</label>
              <select
                id="subject"
                value={subjectID}
                onChange={(event) => setSubjectID(event.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option value="">-- Select a subject --</option>
                {subjects.map((subject) => (
                  <option key={subject._id} value={subject.subjectID}>
                    {subject.subjectName} {subject.subjectTeacherName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="grade" className="block font-medium text-gray-700">Grade:</label>
              <select
                id="grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
                required
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                <option value="">-- Select a grade --</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
                <option value="3">Grade 3</option>
                <option value="4">Grade 4</option>
                <option value="5">Grade 5</option>
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mt-4">
              <div className="mb-2">
                <label className="block font-medium text-gray-700" htmlFor="search">Search:</label>
                <div className="relative">
                  <input
                    className="block w-full px-4 py-2 mt-2 leading-5 text-gray-700 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    id="search"
                    type="text"
                    value={searchTerm}
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                      setShowDropdown(true);
                      setSelectedStudent(null);
                    }}
                    autoComplete="off"
                  />
                  {showDropdown && (
                    <ul className="absolute left-0 w-full mt-2 bg-white rounded-md shadow-lg">
                      {filteredStudents.map((student) => (
                        <li
                          key={student._id}
                          onClick={() => handleSelectStudent(student)}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                        >
                          {student.name} ({student.studentID})
                        </li>
                      ))}
                    </ul>
                  )}
                  {/* {selectedStudent && (
                <div className="absolute left-0 mt-2 bg-white rounded-md shadow-lg">
                  <p className="px-4 py-2 text-sm text-gray-700">{selectedStudent.name}</p>
                  <p className="px-4 py-2 text-sm text-gray-700">{selectedStudent.studentID}</p>
                </div>
              )} */}
                </div>
              </div>
              {selectedStudent && STD && (
                <div className='flex justify-center items-center text-lg font-semibold'>
                  <p className="px-4 py-2 text-gray-700">{STD.name || 'null'}</p>
                  <p className="px-4 py-2 text-gray-700">{STD.studentID}</p>
                </div>
              )}
              {selectedStudent && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {paidForMonth ? (
                    <h1 className='font-semibold' style={{ color: 'green' }}>PAID for selected subject, grade & month</h1>
                  ) : (
                    <h1 className='font-semibold' style={{ color: 'red' }}>NOT PAID</h1>
                  )}
                </div>
              )}
            </div>
            <button className="block px-4 py-2 mx-auto font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:ring-offset-blue-200 active:bg-blue-600" type="submit">Add Attendance</button>
          </form>
          <div>
            <div>
              <h4>Payment History htmlFor Student ID {studentID}</h4>
              {payments.length > 0 ? (
                <table className='border border-black p-1'>
                  <thead className='border border-black p-1 text-center'>
                    <tr>
                      <th className='border border-black p-1'>Date</th>
                      <th className='border border-black p-1'>Month</th>
                      <th className='border border-black p-1'>Subjects</th>
                      <th className='border border-black p-1'>Grade</th>
                      <th className='border border-black p-1'>Paid Amount</th>
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    {payments.map(payment => (
                      <tr key={payment._id}>
                        <td className='border border-black p-1'>{payment.date}</td>
                        <td className='border border-black p-1 text-lg text-green-500'>{payment.month}</td>
                        <td className='border border-black p-1'>{payment.subjects.join(', ')}</td>
                        <td className='border border-black p-1'>{payment.grade}</td>
                        <td className='border border-black p-1'>{payment.paidAmount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No payment history found htmlFor student ID {studentID}</p>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      </div>
      <div className='w-1/3 bg-gray-100 p-4 pt-2'>
        <div>
          <Col xl={8} lg={8} md={12} sm={24} xs={24}>
            <h3>Qr Code Scan by Web Cam</h3>
            <video style={{ width: '100%' }} ref={videoRef} autoPlay playsInline muted onCanPlay={() => handleScanWebCam()} />
            <canvas style={{ display: 'none' }} ref={canvasRef} width={640} height={480} />
            <br></br>
            <h3>Scanned By WebCam Code:<h1 className='text-2xl'> {scanResultWebCam} </h1></h3>
          </Col>
        </div>
      </div>
    </div>
  );
}

export default GetAm;