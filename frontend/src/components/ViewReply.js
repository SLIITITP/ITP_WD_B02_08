import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const TicketDetails = () => {
  const [ticket, setTicket] = useState({});
  const { id} = useParams();
  
 

  useEffect(() => {
    axios.get(`http://localhost:9090/ticket/${id}`).then((res) => {
      if (res.data.success) {
        setTicket(res.data.ticket);
      }
    });
  }, [id]);

 

  return (
   <div>
    <div style={{ marginTop: '20px' }}>
      <h4>{ticket.subject}</h4>
      <hr />

      <dl className="row">
        <dt className="col-sm-3">Ticket Date</dt>
        <dd className="col-sm-9">{ticket.openAt}</dd>
        <dt className="col-sm-3">Ticket details</dt>
        <dd className="col-sm-9">{ticket.details}</dd>
      </dl>

      
    </div>
   
    <label  style={{marginBottom:'5px'}}>Reply</label>
   
    <dd className="col-sm-9">{ticket.message}</dd>

    </div>
  
    
    
  );
  };


  export default TicketDetails;