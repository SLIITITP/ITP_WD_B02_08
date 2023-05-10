import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    whatsappNumber: '',
    address: '',
    grades: [],
    school: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let newGrades = [...formData.grades];
    if (checked) {
      newGrades.push(name);
    } else {
      newGrades = newGrades.filter((grade) => grade !== name);
    }
    setFormData({ ...formData, grades: newGrades });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/students', formData);
      alert('Student registered successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        whatsappNumber: '',
        address: '',
        grades: [],
        school: '',
      });
    } catch (err) {
      console.error(err);
      alert('Registration failed. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        Whatsapp Number:
        <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleChange} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </label>
      <br />
      <label>
        Grades:
        <br />
        <label>
          <input type="checkbox" name="A" checked={formData.grades.includes('A')} onChange={handleCheckboxChange} />
          A
        </label>
        <br />
        <label>
          <input type="checkbox" name="B" checked={formData.grades.includes('B')} onChange={handleCheckboxChange} />
          B
        </label>
        <br />
        <label>
          <input type="checkbox" name="C" checked={formData.grades.includes('C')} onChange={handleCheckboxChange} />
          C
        </label>
      </label>
      <br />
      <label>
        School:
        <input type="text" name="school" value={formData.school} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm