import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import bac4 from '../assets/bac4.jpg'


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
    <div style={{ backgroundColor: '#cdcdcd',padding: '20px',marginLeft:'40px',marginRight:'40px',borderRadius:'5px' }} >
    
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
   <h5 class="text-l font-extrabold dark:text-white" style={{marginLeft:'40px'}}>Reply: </h5>
   <br></br>
   <h6 style={{marginLeft:'40px'}} class="ml-2 font-semibold text-gray-500 dark:text-gray-400">{ticket.message}</h6>

   <br></br>
    </div>
    <div className="opacity-50 absolute">
      <img src={bac4} alt="logo" style={{marginTop:'0px' ,width:'1600px',height:'400px'}}  />
      </div>
    </div>
    
  );
  };


  export default TicketDetails;