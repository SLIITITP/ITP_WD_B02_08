

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const EmailSend = () => {

  const [msg,setMsg] = useState('');
  const [user, setUser] = useState({
    to: "",
    subject: "",
    description: ""
  });

  const { to, subject, description} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


  const [email, setEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');
    setEmail(email);
  }, [location]);


  const onSubmit = async e => {


    console.log("To:", email);
    console.log("Subject:", subject);
    console.log("Description:", description);
   

    try {
      const response = await axios.post('/api/reports/send-report-email', {
        to: `${email}`,
        subject: `${subject}`,
        body: `${description}`
       
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      //setError('Error sending email');
    }


    
  };


  




  return (
    <div className="container">
      <div class="row">
        <div className="col-sm-4 mx-auto shadow p-5">
          <h4 className="text-center mb-2">Send E Mail </h4>
          <p class="mb-3 mt-2" style={{ color: "green", marginLeft: "57px" }}><b>{msg}</b></p>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="To"
              name="to"
              onChange={onInputChange}
              value={email}
            />
          </div>
          <div className="form-group  mb-4 ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Subject"
              name="subject"
              onChange={onInputChange}
              value={subject}
            />
          </div>
          <div className="form-group  mb-4">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Description"
              name="description"
              onChange={onInputChange}
              value={description}
            />
          </div>
          <button onClick={onSubmit} className="btn btn-primary btn-block " style={{ marginLeft: "100px" }}>Send Mail</button>
        </div>
      </div>
    </div>
  );
};

export default EmailSend;

