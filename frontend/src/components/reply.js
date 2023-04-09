import React, { useState, useEffect}  from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'

export default function Reply(props) {
  const [message, setmessage] = useState("");
  

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:9090/ticket/${id}`).then((res)=>{
      if(res.data.success){
        setmessage(res.data.ticket.message);
     
      }
    });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "message") {
      setmessage(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    
    const data = {
    message:message,
    };
    
    
    axios.put(`http://localhost:9090/ticket/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Reply message Successfully");
        setmessage("");
      }
    });
  }
  

  return (
    <div>
      <label style={{ marginBottom: '5px' }}>Reply</label>
      <form >
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            style={{ height: '300px' }}
            name="message"
            value={message}
            onChange={handleInputChange}
          />
          <label htmlFor="floatingTextarea2">Enter the message</label>
        </div>
        <button
          className="btn btn-success"
          type="submit"
         style={{ marginTop: '15px' }}
          onClick={onSubmit}
        >
          <i className="far fa-check-square"></i>
          &nbsp;Submit 
        </button>
      </form>
    </div>
  );
  }
