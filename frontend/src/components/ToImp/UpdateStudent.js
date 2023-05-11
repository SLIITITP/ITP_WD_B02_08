import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


function EditStudent() {

    const location = useLocation();
    const [id] = useState(location.state.sID);

    const [student, setStudent] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [grades, setGrades] = useState([]);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [studentID, setStudentID] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await axios.get(`/api/user/students/${id}`);
                setStudent(res.data);
                setName(res.data.name);
                setEmail(res.data.email);
                setGrades(res.data.grades);
                setWhatsappNumber(res.data.whatsappNumber);
                setPhoneNumber(res.data.phoneNumber);
                setAddress(res.data.address);
                setStudentID(res.data.studentID);
                setPassword(res.data.password);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStudent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`/api/user/students/${id}`, {
                name,
                email,
                grades,
                whatsappNumber,
                phoneNumber,
                address,
                studentID,
                password,
            });
            console.log(res.data);
            toast.success('User Updated successfully');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(`Failed to add user: ${error.response.data.message}`);
            } else {
                toast.error('Failed to add user');
            }
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Edit Student Details</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Student ID:</label>
                    <input type="text" value={studentID} readOnly className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} readOnly className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Grades:</label>
                    <input type="text" value={grades.join(', ')} onChange={(e) => setGrades(e.target.value.split(', '))} required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">WhatsApp Number:</label>
                    <input type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)} required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
                    <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                    <label className="block text-gray-700 font-bold mb-2">Password:</label>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Update
                </button>

            </form>
            <ToastContainer />
        </div>
    );
};

export default EditStudent;