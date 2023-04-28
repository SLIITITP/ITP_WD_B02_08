import React ,{ useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { updateUser, getProfile, deleteUser } from "../apicalls/helper";
import '../stylesheets/layout.css'
import bac3 from '../assets/bac3.jpg'

 function StudentTicket() {

  const [tickets, setTickets] = useState([]);
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({});
  const [apiData1, setApiData1] = useState({});
  const StudentId = apiData1.studentId;
 

 useEffect(() => {
  let usernameFrom = localStorage.getItem("userName");
  console.log(usernameFrom);
  getProfile(usernameFrom).then((results) => {
    let apiData = results.data;
    setApiData1(results.data);

    console.log(results.data.isAdmin);
    if (results.data.isAdmin) {
      setMenu(adminMenu);
    } else {
      setMenu(userMenu);
    }
    setApiData({
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
      profile: apiData?.profile || "",
      id: apiData._id,
      studentId: apiData?.studentId || "",
      isAdmin: apiData?.isAdmin || "",
    });
  });
}, []);

const userMenu = [
  {
    title: "My Ticket",
    paths: ["/Stickets"],
    icon: <i className="ri-calendar-todo-line"></i>,
    onClick: () => navigate("/Stickets"),
  },
  {
    title: "AddTicket",
    paths: ["/addTicket"],
    icon: <i className="ri-table-line"></i>,
    onClick: () => navigate("/addTicket"),
  },
  {
    title: "Profile",
    paths: ["/profile"],
    icon: <i className="ri-todo-line"></i>,
    onClick: () => navigate("/profile"),
  },
  {
    title: "Logout",
    paths: ["/logout"],
    icon: <i className="ri-logout-box-line"></i>,
    onClick: () => {
      localStorage.removeItem("token");
      navigate("/plogin");
    },
  },
];

const adminMenu = [
  {
    title: "Ticket List",
    paths: ["/ticketlist"],
    icon: <i className="ri-calendar-todo-line"></i>,
    onClick: () => navigate("/ticketlist"),
  },
  {
    title: "Report",
    paths: ["/tReport"],
    icon: <i className="ri-todo-line"></i>,
    onClick: () => navigate("/tReport"),
  },
  {
    title: "Profile",
    paths: ["/profile"],
    icon: <i className="ri-menu-add-fill"></i>,
    onClick: () => navigate("/profile"),
  },
  {
    title: "Logout",
    paths: ["/logout"],
    icon: <i className="ri-logout-box-line"></i>,
    onClick: () => {
      localStorage.removeItem("token");
      navigate("/plogin");
    },
  },
];


  useEffect(() => {
    retrieveTickets(StudentId);
    }, [StudentId]);
  const retrieveTickets = (StudentId) => {
  axios.get(`http://localhost:9090/tickets/${StudentId}`).then(res => {
      if (res.data.success) {
        setTickets(res.data.existingTickets);
        console.log(tickets);
      }
    });
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:9090/ticket/delete/${id}`).then((res) => {
      alert("Delete Successfully");
      retrieveTickets(StudentId);
    });
  };

  const filterData = (tickets, searchKey) => {
    const result = tickets.filter((ticket) =>
      ticket.StudentId.toLowerCase().includes(searchKey) ||
      ticket.subject.toLowerCase().includes(searchKey) 
    );
    setTickets(result);
  };

  const handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;
    axios.get(`http://localhost:9090/tickets/${StudentId}`).then(res => {
      if (res.data.success) {
        filterData(res.data.existingTickets, searchKey);
      }
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-9 mt-2 mb-2">
          <h3 className="text-3xl font-bold dark:text-white" style={{ marginLeft: '20px' }}>My Tickets</h3>
        </div>
        <div className="col-lg-3 mt-2 mb-3">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            name="searchQuery"
            onChange={handleSearchArea}
          ></input>
        </div>
      </div>

     
      <div className="opacity-50 absolute">
      <img src={bac3} alt="logo" style={{marginTop:'20px' ,width:'1600px',height:'700px'}}  />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <center>
        <a class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          href="/addTicket" >Add new Ticket</a>
      </center>
      <br></br>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-white uppercase bg-black dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
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

            {tickets.map((tickets, index) => (
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

                     <th scope="row"  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index+1} </th>
                  <td class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">
                    <a href={ `/vreply/${tickets._id}`} style={{textDecoration:'none'}}>
                    {tickets.subject}
                    </a>
                  </td>
                  <td>{tickets.status}</td>
                  <td>{tickets.openAt}</td>
                  <td> 
                   
                    
            <a  class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
             href={`/edit/${tickets._id}`}>Edit</a>

            <a class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
             href="#" onClick={()=>onDelete(tickets._id)}>Delete</a>
         
                   
                
                </td>
            </tr>
            ))}
        </tbody>
    </table>
   </div>   
</div>
  )
}

export default StudentTicket;