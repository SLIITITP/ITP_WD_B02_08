import React, { useState, useEffect ,useRef} from 'react';
import axios from 'axios';
import ReactToPrint from "react-to-print";


 function TicketList() {
  const [tickets, setTickets] = useState([]);
  const componentRef = useRef();
 

  useEffect(() => {
    retrieveTickets();
  }, []);

  const retrieveTickets = () => {
    axios.get('http://localhost:9090/tickets').then((res) => {
      if (res.data.success) {
        setTickets(res.data.existingTickets);
      }
    });
  };

 

  const pendingOperatorResponseCount = tickets.filter(
    (ticket) => ticket.status === 'Pending operator response'
  ).length;

  const pageStyle = `
  @page {
    size: A4;
    margin: 1cm;
    @top-center {
      content: "Thilina Institute Hanwella";
      font-size: 38px;
      font-weight: bold;
    }
`;


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h3 className="text-3xl font-bold dark:text-white" style={{ marginLeft: '20px' }}>
            Ticket Report
          </h3>
        </div>

      </div>
   <div ref={componentRef} > 
      <div><center>
        <h4  class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
        Total Tickets:  {tickets.length}</h4>
      </center></div>
      <div><center>
        <h4  class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
       Pending Tickets:  {pendingOperatorResponseCount}</h4>
      </center></div>

<br></br>
<div  className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Student Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Subject
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Open Date
                </th>
               
            </tr>
        </thead>
        <tbody>
      
            {tickets.map((tickets,index)=>(
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row"  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1} </th>
                  <td >
                    {tickets.StudentId}
                  </td>
                  <td>{tickets.subject}</td>
                  <td>{tickets.status}</td>
                  <td>{tickets.openAt}</td>
                  <td> 
            
                </td>
            </tr>
            ))}
        </tbody>
    </table>
   
 <ReactToPrint
  trigger={() => <button className='bg-yellow-400 border-2 border-black mt-3 mr-3 font-bold float-right p-2 hover:bg-yellow-300'>Download Report</button>}
  content={() => componentRef.current}
  documentTitle="Thilina institute Hanwella"
  pageStyle={pageStyle}

/>
    <br></br><br></br>
</div>
</div>      

</div>      


 
  
   )
 }

 export default TicketList;