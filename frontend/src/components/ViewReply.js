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
      <br></br>
   <h5 class="text-l font-extrabold dark:text-white" style={{marginLeft:'40px'}}>Ticket Subject :
   <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">{ticket.subject}</small></h5>

    <br></br>
      
   <h5 class="text-l font-extrabold dark:text-white" style={{marginLeft:'40px'}}>Ticket Date :
   <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">{ticket.openAt}</small></h5>
    
    <br></br>
      
   <h5 class="text-l font-extrabold dark:text-white" style={{marginLeft:'40px'}}>Ticket Details :
   <small class="ml-2 font-semibold text-gray-500 dark:text-gray-400">{ticket.details}</small></h5>

    <br></br>
   <h5 class="text-l font-extrabold dark:text-white" style={{marginLeft:'40px'}}>Reply </h5>
   <br></br>
   <h6 style={{marginLeft:'40px'}}><mark class="px-2 text-white bg-gray-500 rounded dark:bg-gray-400">{ticket.message}</mark></h6>
    </div>
  
    
    
  );
  };


  export default TicketDetails;