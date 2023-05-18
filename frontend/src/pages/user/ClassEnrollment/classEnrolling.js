import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//import { getUserInfo } from "../../.././apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { SetUser } from "../../.././redux/usersSlice.js";
//import { message } from "antd";
import { updateUser, getProfile, deleteUser } from "../../.././apicalls/helper";
function ClassEnrolling() {
  const location = useLocation();
  const [enrolledClassIds=[], setEnrolledClassIds] = useState([]);
  const [enrolledClassesData=[], setEnrolledClassesData] = useState([]);
  const { user } = useSelector((state) => state.users);
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiData1, setApiData1] = useState({});

  // const getUserData = async () => {
  //   try {
  //     const response = await getUserInfo();
  //     if (response.success) {
  //       dispatch(SetUser(response.data));
  //     } else {
  //       message.error(response.message);
  //     }
  //   } catch (error) {
  //     message.error(error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     getUserData();
  //   } else {
  //     navigate("/login"); //if there is problem with token user navigate login
  //   }
  // }, []);

  useEffect(() => {
    let usernameFrom = localStorage.getItem("userName");
    console.log(usernameFrom);
    getProfile(usernameFrom).then((results) => {
      setApiData1(results.data);
      console.log(results.data._id);
    });
  }, []);


  const stdID = apiData1?._id;
  const studentID = apiData1?.studentId;
  const stdGrade = apiData1?.grade;
  const stdEmail = apiData1?.email
  console.log(apiData1?.email)

  const [classId] = useState(location.state.cId);
  const [grade] = useState(location.state.cGrade);
  const [subject] = useState(location.state.cSubject);
  const [teacher] = useState(location.state.cTeacher);
  const [date] = useState(location.state.cDate);
  const [time] = useState(location.state.cTime);
  const [fees] = useState(location.state.cFees);


  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`http://localhost:9090/api/payment/status/${studentID}`);
      console.log(response.data.paid)
      return response.data.paid;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  useEffect(() => {
    // Get the student's enrolled class IDs from the backend
      axios
        .get(`http://localhost:9090/api/enroll/enrollments/${studentID}`)
        .then((res) => {
          setEnrolledClassIds(res.data.data);
        })
        .catch((err) => {
          alert(err.message);
        });
  
  }, [studentID]);
  
  useEffect(() => {
    // Get the details of the enrolled classes
    const fetchEnrolledClasses = async () => {
      try {
        const filteredIds = enrolledClassIds.filter(Boolean);
        console.log(filteredIds);
        const enrolledClassesData = await Promise.all(
          filteredIds.map((classId) =>
            axios.get(`http://localhost:9090/class/getClassById/${classId}`)
              .then((res) => {
                const { date,time, grade, subject, teacher,hall, fees, _id } = res.data.selectedClass;
                // Extracting start and end times from the 'time' string
                const startTime = time.split("-")[0];
                console.log(startTime)
                return { date,time, grade, subject, teacher, hall, fees, _id, };
              })
              .catch((err) => {
                alert(err.message);
                return null;
              })
          )
        );
        setEnrolledClassesData(enrolledClassesData.filter(Boolean));
        console.log(enrolledClassesData);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchEnrolledClasses();
  }, [enrolledClassIds]);

  const handleEnroll = async (e) => {

    console.log(typeof (classId))
    e.preventDefault();
    
    const classDay = date
    const startTime = time.split("-")[0]
    console.log(startTime)
    
    // Check if the student has paid the admission fee
    const hasPaid = await checkPaymentStatus();
    if (!hasPaid) {
      navigate('/enrollmentCheckout', {
        state: {
          stdID: stdID,
          studentId: studentID,
          stdGrade: stdGrade,
          stdEmail: stdEmail,
        }

      }); // Navigate to payment page
      return;
    } 
  else if (enrolledClassesData.filter((clz) => clz.date === classDay && clz.time.split("-")[0] === startTime).length > 1) {
    alert("Class Time is clashing with another class")
  }   
  // Enroll to the class  
  else{
    await axios.post(
      `http://localhost:9090/api/enroll/enrollments`,
      {
        "studentID": stdID,
        "classID": classId
      },

    ).then(response => {
      console.log(response)
      alert("Enrolled Successfully")
    }, error => {
      console.log(error)
      if (error.response && error.response.status === 400 && error.response.data.message === "Already enrolled") {
        alert("You have already enrolled in this class.");
      } else {
        alert("Enrollment failed.");
      }
    })
  }

  };

  return (
    <div>
      <h3 className="mb-4 mt-12 text-center font-medium text-2xl text-gray-900 dark:text-white">Enroll to the Class</h3>
      <div className="d-flex justify-content-center ">
        <div className="col-lg-3" >
          <div className="card mt-6" style={{ width: "400px", height: "300px" }}>
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
