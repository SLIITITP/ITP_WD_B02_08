import React, { useState, useEffect , useRef} from 'react';
import axios from 'axios';
import { getUserInfo } from "../../.././apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../.././redux/usersSlice.js";
import { getProfile} from "../../.././apicalls/helper";
import { message } from "antd";
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function MyTimetable() {
//view timetabe 
const [classes=[], setClasses] = useState([]);
const [activeDay, setActiveDay] = useState('Monday');
const [filteredClasses, setFilteredClasses] = useState(classes);
const [enrolledClassIds=[], setEnrolledClassIds] = useState([]);
const [enrolledClassesData=[], setEnrolledClassesData] = useState([]);
const [apiData, setApiData] = useState({});
const [apiData1, setApiData1] = useState({});
const [reminderData, setReminderData] = useState({});
const [isModalOpen, setIsModalOpen] = useState(false);

const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        //message.error(response.message);
      }
    } catch (error) {
      //message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login"); //if there is problem with token user navigate login
    }
  }, []);

  useEffect(() => {
    let usernameFrom = localStorage.getItem("userName");
    console.log(usernameFrom);
    getProfile(usernameFrom).then((results) => {
      let apiData = results.data;
      setApiData1(results.data);
      console.log(results.data._id);
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

  const studentID = apiData1?._id;
  console.log(apiData1._id)

  const handleDayClick = (date) => {
    setActiveDay(date);
    const filteredClasses = classes.filter((clz) => {
      const clzDay = clz.date.toLowerCase();
      const clzTimeRange = clz.time.toLowerCase();
      const clzStartTime = convertTo24Hour(clzTimeRange.split("-")[0]);
      const clzEndTime = convertTo24Hour(clzTimeRange.split("-")[1]);
      return clzDay === date.toLowerCase() && clzStartTime >= 0 && clzEndTime <= 24;
    });
    setFilteredClasses(filteredClasses);
  };
    
  function convertTo24Hour(time) {
    const [hour, minute] = time.split(":");
    let hour24 = parseInt(hour, 10);
  
    if (time.includes('pm')) {
      if (hour24 !== 12) {
        hour24 += 12;
      }
    } else if (hour24 === 12) {
      hour24 = 0;
    }
  
    return hour24;
  }
  

const dayButtons = [
  { date: 'Monday', label: 'Monday' },
  { date: 'Tuesday', label: 'Tuesday' },
  { date: 'Wednesday', label: 'Wednesday' },
  { date: 'Thursday', label: 'Thursday' },
  { date: 'Friday', label: 'Friday' },
  { date: 'Saturday', label: 'Saturday' },
  { date: 'Sunday', label: 'Sunday' },
];

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
              return { date,time, grade, subject, teacher, hall, fees, _id  };
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


//Unenroll from a class
const handleUnenroll = async (classID) => {
  try {
    const response = await axios.delete(`http://localhost:9090/api/enroll/unenroll/${studentID}/${classID}`);
    console.log(response.data); 
    alert("Unenrollment successful!"); 
  } catch (error) {
    console.error(error);
    alert("Error occurred during unenrollment. Please try again."); 
  }
};

const renderUnenrollButton = (classID) => {
  return (
    <button className=" text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none 
                       font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center" 
     onClick={() => handleUnenroll(classID)}>Unenroll</button>
  );
};



const tableRef = useRef();
//Download timetable as a pdf
function handlePrintClick() {
  const doc = new jsPDF({ orientation: 'landscape' });
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Restructure the data to group classes by day
  const classesByDay = {};
  enrolledClassesData.forEach(clz => {
    if (!classesByDay[clz.date]) {
      classesByDay[clz.date] = [];
    }
    classesByDay[clz.date].push(clz);
  });

// Add table to PDF for each day of the week
const tableHeaders = ['Day','Time','Subject', 'Grade',  'Teacher'];
//doc.setFontSize(24);
//doc.text("My Class Schedule", 14, 25);
doc.autoTable({
  head: [tableHeaders],
})
weekdays.forEach((day, index) => {
  const classRows = classesByDay[day];
  if (classRows) {    
    const tableRows = classRows.map(clz => [clz.date, clz.time, clz.subject, clz.grade,  clz.teacher]);
    doc.setFontSize(18);
    doc.autoTable({
      
      body: tableRows,
      margin: { top: 50 },
      tableWidth: 'auto',
      theme: 'striped',
      styles: { 
        cellPadding: 3, 
        valign: 'left',
        halign: 'left',
        overflow: 'linebreak',
        fontSize: 10
      },
      columnStyles: {
        0: { align: 'left' }, // Date column aligned to the left
        1: { align: 'left' }, // Time column aligned to the left
        2: { align: 'left' }, // Subject column aligned to the left
        3: { align: 'left' }, // Grade column centered
        4: { align: 'left' }, // Teacher column aligned to the left
      }
    });
  }
});
doc.save('class-schedule.pdf');
}


//set the remider
const now = new Date();

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const currentWeekday = weekdays[now.getDay()];
let todayClasses = null;

for (let i = 0; i < enrolledClassesData.length; i++) {
  const classSchedules = enrolledClassesData[i];
  console.log(classSchedules.date);
  if (classSchedules.date === currentWeekday) {
    const clzSubject = classSchedules.subject
    const clzTeacher = classSchedules.teacher
    const clzTime = classSchedules.time
    console.log(clzTeacher)
  }  
}


return (
<div className="container my-5 ml-9" style={{ maxWidth: "1600px"}}>     
{/*View timetable*/}
<div class="col-11" >
<h3 className="mb-4 text-center font-medium text-2xl text-gray-900 dark:text-white">My Class Schedule</h3>
<nav className="d-flex justify-content-center mb-4">
      <ul className="nav nav-pills">
      {dayButtons.map((button) => (
          <li className="nav-item" key={button.date}>
            <button
              className={`nav-link btn ${activeDay === button.date ? 'active' : ''}`}
              onClick={() => handleDayClick(button.date)}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
<div className="table-responsive">
<table className="table table-striped table-hover" ref={tableRef}>
  <thead className="text-center">
    <tr>
      <th>Time</th>
      <th>Grade</th>
      <th>Subject</th>
      <th>Teacher</th>
      <th>Hall</th>
      <th>Fees</th>
    </tr>
  </thead>
  <tbody className="text-center">
  {enrolledClassesData
  .filter((clz) => clz.date === activeDay)
  .sort((a, b) => {
    const timeAStart = convertTo24Hour(a.time.split("-")[0]);
    const timeBStart = convertTo24Hour(b.time.split("-")[0]);
    return timeAStart - timeBStart;
  })
  .map((clz) => (
    <tr key={clz.id}>
      <td>{clz.time}</td>
      <td>Grade {clz.grade}</td>
      <td>{clz.subject.split("-")[0]}</td>
      <td>{clz.teacher}</td>
      <td>{clz.hall}</td>
      <td>Rs.{clz.fees}</td>
      <td>{renderUnenrollButton(clz._id)}</td>
    </tr>
  ))}
  </tbody>
</table>
<button className="btn btn-primary" onClick={handlePrintClick}>
Download Timetable
</button>

</div> 
</div>
  </div>
);

}

export default MyTimetable;