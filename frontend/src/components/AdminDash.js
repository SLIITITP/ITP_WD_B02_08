import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../stylesheets/Username.module.css";
import generatePDF from "../apicalls/Reportgenerator";
import style from "../stylesheets/AdminDash.module.css";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import {registrationStatus} from '../apicalls/helper'

function AdminDash() {
  const [Userdata, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [isHidden,setIsHidden] = useState(true)
  const [studentId,setStudentId]=useState();
  const [currentStudent,setCurrentStudent]=useState({});
  const columnsPDF = [
    { Username: "Username", Email: "Email", studentId: "StudentID" },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/getAllUsers")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, [Userdata]);

  function handleAddClick(studentId, status) {
    console.log(studentId);
    axios
      .put(`/api/approveUser/${studentId}/${status}`)
      .then((res) => {
        let pd ={}
        // Update the Userdata state to reflect the change
        setUserData((prevState) => {
          const updatedData = [...prevState];
          const index = updatedData.findIndex((user) => user._id === studentId);
          updatedData[index].isApproved = status;
          console.log(updatedData[index]);
          return updatedData;
        });
        let currentS = Userdata.filter((user) => user._id === studentId);
        console.log(currentS);
        registrationStatus(currentS[0],status)
        .then((res)=>{
          console.log(res);
        })
      })
      .catch((err) => {
        console.log(err.response.data);
        alert(err);
      });
  }

  function openModal(id) {
      setIsHidden(false);
      setStudentId(id);
  }

  function toggleModal(show) {
    console.log(show)
    handleAddClick(studentId,show);
    setIsHidden(true);
  }

  return (
    <div>
      <Toaster position='top-center' reverseOrder={false}></Toaster>
    <div id="myModal"  hidden={isHidden} class="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
  <div class="max-w-lg mx-auto my-6">
    {/* <!--content--> */}
    <div class="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
      {/* <!--header--> */}
      <div class="flex items-center align-middle justify-center px-5 py-4 border-b border-solid border-gray-300 rounded-t">
        <h3 class="text-2xl mx-25 font-semibold text-center">
          Student Registration Aprrove
        </h3>
      </div>
      {/* <!--body--> */}
      <div class="relative p-6 flex-auto">
        <p class="my-4 text-gray-600 text-lg leading-relaxed">
          This is Admin task
          Carefully watched and give Approval or Disapproval for Student 
          creation 
        </p>
      </div>
      {/* <!--footer--> */}
      <div class="flex  z-50 items-center  justify-around p-6 border-t border-solid border-gray-300 rounded-b">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400 disabled:cursor-not-allowed"
                   onClick={()=>toggleModal(2)}>DisApprove</button>
                   <br></br>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400 disabled:cursor-not-allowed"
         onClick={()=>toggleModal(1)}          >
          Approve
        </button>
        <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400 disabled:cursor-not-allowed"
           onClick={()=>setIsHidden(true)}
           >
          Cancel
        </button>
      </div>
    </div>
  </div>
  <div class="fixed inset-0 z-40 bg-black opacity-25"></div>
</div>
      <h1 style={{ textAlign: "center", fontSize: "40px", marginTop: "1%" }}>
        All Users
      </h1>
      <br />
      <div
        className="top"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form>
          <input
            type="search"
            value={search}
            placeholder=" Search for username"
            aria-label="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />

          <button
            className="btnDownload"
            onClick={() =>
              generatePDF(
                Userdata.map((m) => ({
                  Username: m.username,
                  Email: m.email,
                  //mobile:m.mobile
                  studentId: m.studentId,
                })),
                columnsPDF,
                false,
                "All Users"
              )
            }
          >
            Download
          </button>
        </form>
      </div>
      <table className={style.table}>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Student ID</th>
          <th>Grade</th>
          <th>Approve / Disapprove</th>
        </tr>
        {Userdata.filter((element) => {
          if (search === "") {
            return element;
          } else if (
            element.username.toLowerCase().includes(search.toLowerCase())
          ) {
            return element;
          }
        }).map((elm, i) => (
          <tr key={i} style={{ textAlign: "center", fontWeight: "400" }}>
            <td>{elm.username}</td>
            <td>{elm.email}</td>
            <td>{elm.studentId}</td>
            <td>{elm.grade}</td>

            <td>
              {elm.isApproved === 1 ? (
                <button
                  disabled
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-green-400 disabled:cursor-not-allowed"
                  onClick={() => handleAddClick(elm._id, 1)}
                >
                  Approved
                </button>
              ) : elm.isApproved === 2 ? (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-red-400 disabled:cursor-not-allowed"
                  disabled
                  onClick={() => handleAddClick(elm._id, 2)}
                >
                  Disapproved
                </button>
              ) : (
                <button
                className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded disabled:bg-red-400 disabled:cursor-not-allowed"
                 onClick={() => openModal(elm._id)}>
                  Click to Approve
                </button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default AdminDash;
