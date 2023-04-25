
import React, { useState, useEffect} from 'react';
import axios from 'axios';


//import { getUserInfo } from "../apicalls/users";
//import { useDispatch, useSelector } from "react-redux";
//import { SetUser } from "../redux/usersSlice.js";
//import { parsePath, useNavigate } from "react-router-dom";
//import { message } from "antd";
//import { HideLoading, ShowLoading } from "../redux/loaderSlice";



 function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  
 
  {/*const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const getUserData = async (dispatch) => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        const role = response.data.isAdmin ? "admin" : "user";
        setRole(role);

        
        return role;
      } else {
        message.error(response.message);
        return;
      }
    } catch (error) {
      message.error(error.message);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("token")) {
          const role = await getUserData(dispatch);
          setRole(role);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [dispatch, navigate]);*/}
  
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

  const onDelete = (id) => {
    axios.delete(`http://localhost:9090/ticket/delete/${id}`).then((res) => {
      alert('Delete Successfully');
      retrieveTickets();
    });
  };

  const filterData = (tickets, searchKey) => {
    const result = tickets.filter(
      (ticket) =>
        ticket.StudentId.toLowerCase().includes(searchKey) ||
        ticket.subject.toLowerCase().includes(searchKey) 
    
    );
    setTickets(result);
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get('http://localhost:9090/tickets').then((res) => {
      if (res.data.success) {
        filterData(res.data.existingTickets, searchKey);
      }
    });
    setSearchKey(searchKey);
  };

  const pendingOperatorResponseCount = tickets.filter(
    (ticket) => ticket.status === 'Pending operator response'
  ).length;

 


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h3 className="text-3xl font-bold dark:text-white" style={{ marginLeft: '20px' }}>
            Ticket List
          </h3>
        </div>

        <div className="col-lg-3 mt-2 mb-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            value={searchKey}
            onChange={handleSearchArea}
          />
        </div>
      </div>
   <div  > 
      <div><center>
        <h4  class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
       <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500"> Total Tickets:  {tickets.length}</mark></h4>
      </center></div>
      <div><center>
        <h4  class="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-white">
       <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500"> Pending Tickets:  {pendingOperatorResponseCount}</mark></h4>
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
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
      
            {tickets.map((tickets,index)=>(
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row"  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1} </th>
                  <td class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    <a href={ `/reply/${tickets._id}`} style={{textDecoration:'none'}}>
                    {tickets.StudentId}
                    </a>
                  </td>
                  <td>{tickets.subject}</td>
                  <td>{tickets.status}</td>
                  <td>{tickets.openAt}</td>
                  <td> 
      
            <a class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
             href="#" onClick={()=>onDelete(tickets._id)}>Delete</a>
         
          
                
                </td>
            </tr>
            ))}
        </tbody>
    </table>

    <br></br><br></br>
     
    </div>
  </div>   
  <center>
    <a class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
      href="tReport" >View Report</a>
  </center>
</div>      


 
  
   )
 }

 export default TicketList;