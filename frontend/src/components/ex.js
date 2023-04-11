import React, { useState } from 'react';
import axios from 'axios';

const ex = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [subject, setSubject] = useState('');
  const [mobile, setMobile] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:9090/AAA/add', {
        name,
        address,
        subject,
        mobile
      });
      console.log(res.data);
      // reset form
      setName('');
      setAddress('');
      setSubject('');
      setMobile('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Address</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div>
        <label>Subject</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div>
        <label>Mobile</label>
        <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default ex;
