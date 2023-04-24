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
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="card shadow p-5 mt-7">
            <h4 className="text-center mb-3">Type Your Response Here</h4>
            <p className="mb-3 mt-2 text-success text-center"><b>{msg}</b></p>
            <form>
              <div className="form-group">
                <label htmlFor="to">To</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter recipient's email"
                  name="to"
                  onChange={onInputChange}
                  value={email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter email subject"
                  name="subject"
                  onChange={onInputChange}
                  value={subject}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  rows="5"
                  placeholder="Enter email description"
                  name="description"
                  onChange={onInputChange}
                  value={description}
                ></textarea>
              </div>

              <button onClick={onSubmit}
                                    className="btn btn-primary">
                                   Send Email
                                </button>

             
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSend;
