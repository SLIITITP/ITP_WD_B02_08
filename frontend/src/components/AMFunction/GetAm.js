import React, { useState, useEffect, useRef } from 'react';

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

    console.log('--------------------------------------')
    //get SubID by searching subjectID
    const subID = subjects.find(subject => subject.subjectID === subjectID);

    const handleSearch = (studentID) => {
        fetch(`http://localhost:9090/api/payment/history/${studentID}`)
            .then(response => response.json())
            .then(data => {
                setPayments(data);
                // console.log(data);
                const paymentForSubject = data.filter(payment => payment.subjectsIDs.includes(subID._id));
                // console.log('payments for selected subject',paymentForSubject);
                const filterGrade = paymentForSubject.filter(payment => payment.grade.includes(grade));
                console.log(filterGrade)
                const pm = filterGrade.filter(payment => payment.month.includes(currMonth));
                // console.log(pm);
                if (pm.length > 0) {
                    setPaidForMonth(true);
                } else {
                    setPaidForMonth(false);
                }

            })
            .catch(error => {
                console.error(error);
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
                setSuccessMessage('')
                setErrorMessage(errorData.error);
            } else {
                setErrorMessage('');
                setSuccessMessage('Attendance Added');
                // Reset student input field
                setSearchTerm('');
            }

        } catch (error) {
            console.error(error);
            setErrorMessage('server error', error)
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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(event) => setDate(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="time">Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(event) => setTime(event.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="subject">Subject:</label>
                    <select
                        id="subject"
                        value={subjectID}
                        onChange={(event) => setSubjectID(event.target.value)}
                        required
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
                    <label htmlFor="grade">Grade:</label>
                    <select
                        id="grade"
                        value={grade}
                        onChange={(event) => setGrade(event.target.value)}
                        required
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

                <div>
                    <label htmlFor="search">Search:</label>
                    <div className="search-box">
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={(event) => {
                                setSearchTerm(event.target.value);
                                setShowDropdown(true);
                                setSelectedStudent(null);
                            }}
                        />
                        {showDropdown && (
                            <ul className="search-results">
                                {filteredStudents.map((student) => (
                                    <li key={student._id} onClick={() => handleSelectStudent(student)}>
                                        {student.name} ({student.studentID})
                                    </li>
                                ))}
                            </ul>
                        )}
                        {selectedStudent && (
                            <div>
                                <p>{selectedStudent.name}</p>
                                <p>{selectedStudent.studentID}</p>
                            </div>
                        )}
                    </div>
                </div>

                <button type="submit">Add Attendance</button>
            </form>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <div>
                {paidForMonth ? (
                    <h1 style={{ color: 'green' }}>Paid for selected subject, grade & month</h1>
                ) : (
                    <h1 style={{ color: 'red' }}>NOT PAID</h1>
                )}
            </div>
            <div>
                <div>
                    <h4>Payment History for Student ID {studentID}</h4>
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
                        <p>No payment history found for student ID {studentID}</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GetAm;






// import React, { useState, useEffect, useRef } from 'react';

// function GetAm() {
//     const [date, setDate] = useState('');
//     const [time, setTime] = useState('');
//     const [subjectID, setSubjectID] = useState('');
//     const [studentID, setStudentID] = useState('');
//     const [subjects, setSubjects] = useState([]);
//     const [students, setStudents] = useState([]);
//     const [grade, setGrade] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');

//     // Set date and time automatically
//     useEffect(() => {
//         const now = new Date();
//         setDate(now.toISOString().slice(0, 10));
//         setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
//     }, []);

//     // create a ref for the student input field
//     const studentRef = useRef(null);

//     // Fetch subjects and students on component mount
//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 // Fetch subjects
//                 const subjectResponse = await fetch('/api/subject/subjects');
//                 const subjectData = await subjectResponse.json();
//                 setSubjects(subjectData);

//                 // Fetch students
//                 const studentResponse = await fetch('/api/user/list');
//                 const studentData = await studentResponse.json();
//                 // console.log(studentData);
//                 // console.log(typeof studentData);
//                 setStudents(studentData);
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         fetchData();
//     }, []);

//     // Handle form submission
//     async function handleSubmit(event) {
//         event.preventDefault();

//         try {
//             // Send POST request to add AmNip data
//             const response = await fetch('/api/amnip/add', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({
//                     date,
//                     time,
//                     subjectID,
//                     studentID,
//                     grade
//                 })
//             });

//             // Handle response
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 setSuccessMessage('')
//                 setErrorMessage(errorData.error);
//             } else {
//                 setErrorMessage('');
//                 setSuccessMessage('Attendance Added');
//                 // Reset student input field
//                 studentRef.current.value = '';
//             }

//         } catch (error) {
//             console.error(error);
//             setErrorMessage('server error', error)
//         }
//     }


//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="date">Date:</label>
//                     <input
//                         type="date"
//                         id="date"
//                         value={date}
//                         onChange={(event) => setDate(event.target.value)}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="time">Time:</label>
//                     <input
//                         type="time"
//                         id="time"
//                         value={time}
//                         onChange={(event) => setTime(event.target.value)}
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label htmlFor="subject">Subject:</label>
//                     <select
//                         id="subject"
//                         value={subjectID}
//                         onChange={(event) => setSubjectID(event.target.value)}
//                         required
//                     >
//                         <option value="">-- Select a subject --</option>
//                         {subjects.map((subject) => (
//                             <option key={subject._id} value={subject.subjectID}>
//                                 {subject.subjectName} {subject.subjectTeacherName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div>
//                     <label htmlFor="grade">Grade:</label>
//                     <select
//                         id="grade"
//                         value={grade}
//                         onChange={(event) => setGrade(event.target.value)}
//                         required
//                     >
//                         <option value="">-- Select a grade --</option>
//                         <option value="1">Grade 1</option>
//                         <option value="2">Grade 2</option>
//                         <option value="3">Grade 3</option>
//                         <option value="4">Grade 4</option>
//                         <option value="5">Grade 5</option>
//                         <option value="6">Grade 6</option>
//                         <option value="7">Grade 7</option>
//                         <option value="8">Grade 8</option>
//                         <option value="9">Grade 9</option>
//                         <option value="10">Grade 10</option>
//                         <option value="11">Grade 11</option>
//                         <option value="Other">Other</option>
//                     </select>
//                 </div>

//                 <div>
//                     <label htmlFor="student">Student:</label>
//                     <select
//                         id="student"
//                         value={studentID}
//                         onChange={(event) => setStudentID(event.target.value)}
//                         required
//                         ref={studentRef} // add the ref to the student input field
//                     >
//                         <option value="">-- Select a student --</option>
//                         {students.map((student) => (
//                             <option key={student._id} value={student.studentID}>
//                                 {student.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <button type="submit">Add AmNip Data</button>
//             </form>
//             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//             {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//         </div>
//     );
// }

// export default GetAm;