import React, { useState, useEffect}  from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import ViewReply from './ViewReply';

export default function Reply(props) {
  const [message, setmessage] = useState("");
  const [status, setstatus] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:9090/ticket/${id}`).then((res)=>{
      if(res.data.success){
        setmessage(res.data.ticket.message);
        setstatus(res.data.ticket.status);
     
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
    status:"Getting operator Reply",
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
      <div>
      <ViewReply />
    </div>
      <div className="col-lg-9 mt-2 mb-2">
      {/*<h5 className="text-2xl font-bold dark:text-white" style={{marginLeft:'40px'}}> Reply</h5>*/}
      </div>

      <form style={{padding: '40px'}}>

        
   <div class="mb-6">
   
   <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
     name="message"
     placeholder="Enter Reply message"
     style={{ height: '300px' }}
     value={message}
     onChange={handleInputChange} ></textarea>
  </div>
       {/*} <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            style={{ height: '300px' }}
            name="message"
            value={message}
            onChange={handleInputChange}
          />
          <label htmlFor="floatingTextarea2">Enter the message</label>
        </div>*/}
       

        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={onSubmit}>Submit</button>
      </form>
    </div>
  );
  }