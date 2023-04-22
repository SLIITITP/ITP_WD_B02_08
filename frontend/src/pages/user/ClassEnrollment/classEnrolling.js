import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { getUserInfo } from "../../.././apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../.././redux/usersSlice.js";
import { message } from "antd";
function ClassEnrolling() {
  const location = useLocation();

  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login"); //if there is problem with token user navigate login
    }
  }, []);

  const stdID = user?._id;

  const [classId] = useState(location.state.cId);
  const [grade] = useState(location.state.cGrade);
  const [subject] = useState(location.state.cSubject);
  const [teacher] = useState(location.state.cTeacher);
  const [date] = useState(location.state.cDate);
  const [time] = useState(location.state.cTime);
  const [fees] = useState(location.state.cFees);

  const handleEnroll = async (e) => {

    console.log(typeof(classId))
    const token = localStorage.getItem("token");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    e.preventDefault();
   
     await axios.post(
        `http://localhost:9090/api/enroll/enrollments`,
         {
          "studentID": stdID,
          "classID":classId
      } ,
        { headers }
      ).then(response=>{
        console.log(response)
        alert("Enrolled Successfully")
      },error=>{
        console.log(error)
        if (error.response && error.response.status === 400 && error.response.data.message === "Already enrolled") {
          alert("You have already enrolled in this class.");
        } else {
          alert("Enrollment failed.");
        }
      })
      
    
  };

  return (
    <div>
      <h3 className="mb-4 mt-12 text-center font-medium text-2xl text-gray-900 dark:text-white">Enroll to the Class</h3>
      <div className="d-flex justify-content-center ">
      <div className="col-lg-3" >
        <div className="card mt-6" style={{ width: "400px" , height:"300px"}}>
          <div className="card-body mt-6 ml-6 " style={{ fontSize: "18px" }}>
            {grade && <p>Grade: {grade}</p>}
            {subject && <p>Subject: {subject}</p>}
            {teacher && <p>Teacher: {teacher}</p>}
            {date && <p>Date: {date}</p>}
            {time && <p>Time: {time}</p>}
            {fees && <p>Fees: Rs.{fees}</p>}
          </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mr-6 ml-6 mb-4
          focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center "
          onClick={handleEnroll}
        >
        Enroll
       </button>
       </div>
       </div>
      </div>
    </div>

  );
  
}
export default ClassEnrolling;
