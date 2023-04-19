import React, { useState } from 'react';
import axios from 'axios';

function StudentIDForm() {
    const [name, setName] = useState('');
    const [grade, setGrade] = useState('');
    const [generatedID, setGeneratedID] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        let studentID = '';
        let response = null;

        do {
            // Generate student ID
            const year = new Date().getFullYear().toString().substr(-2);
            const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
            studentID = `STD${year}${grade}${randomNum}`;

            // Check if ID exists in database
            response = await axios.get(`/api/user/checkID/${studentID}`);
        } while (response.data.exists === true);

        // Save student info and ID to database
        await axios.post('/api/user/add', { studentID, name });

        // Display generated ID
        setGeneratedID(studentID);
        setError('');
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
                <label>
                    Grade:
                    <input type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Generate ID</button>
            </form>
            {generatedID && <p>Generated ID: {generatedID}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default StudentIDForm;
