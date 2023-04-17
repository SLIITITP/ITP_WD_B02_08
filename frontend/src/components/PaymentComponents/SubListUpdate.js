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

    const handleSubjectClick = (subject) => {
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
            <ul>
                {subjects.map((subject) => (
                    <li key={subject._id} onClick={() => handleSubjectClick(subject)}>
                        {subject.subjectName} {subject.subjectTeacherName}   {subject.subjectID}
                    </li>
                ))}
            </ul>
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
