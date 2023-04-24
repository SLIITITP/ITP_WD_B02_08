import React, { useState, useEffect , useRef} from 'react';
import axios from 'axios';
import { getUserInfo } from "../../.././apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../.././redux/usersSlice.js";
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

  const studentID = user?._id;

const handleDayClick = (date) => {
  setActiveDay(date);
    const filteredClasses = classes.filter((clz) => {
    const clzDay = clz.date.toLowerCase();
    const clzStartTime = convertTo24Hour(clz.time.split(' ')[0]);
    return clzDay === date.toLowerCase() && clzStartTime >= 0;
  });
  setFilteredClasses(filteredClasses);
};

  classes.sort((a, b) => {
    const timeAStart = convertTo24Hour(a.time.split(' ')[0]);
    const timeBStart = convertTo24Hour(b.time.split(' ')[0]);
    return timeAStart - timeBStart;
  });
  
  function convertTo24Hour(time) {
    const [hour, minute] = time.split(':');
  let hour24 = parseInt(hour, 10);

  if (time.includes('pm')) {
    if (hour24 !== 12) {
      hour24 += 12;
    } else {
      // add a fraction to the hour so that it appears after the other
      // morning times but before the other afternoon times
      hour24 += 0.5;
    }
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
              const { date,time, grade, subject, teacher,hall, fees } = res.data.selectedClass;
              return { date,time, grade, subject, teacher, hall, fees  };
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
doc.autoTable({
  head: [tableHeaders],
  styles: { 
    cellPadding: 3, 
    valign: 'left',
    halign: 'left',
    overflow: 'linebreak',
    fontSize: 12
  },
  columnStyles: {
    0: { align: 'left' }, // Day column aligned to the left
    1: { align: 'left' }, // Time column aligned to the left
    2: { align: 'left' }, // Subject column aligned to the left
    3: { align: 'left' }, // Grade column centered
    4: { align: 'left' }, // Teacher column aligned to the left
  }});
weekdays.forEach((day, index) => {
  const classRows = classesByDay[day];
  if (classRows) {    
    const tableRows = classRows.map(clz => [clz.date, clz.time, clz.subject, clz.grade,  clz.teacher]);
    doc.setFontSize(18);
    doc.autoTable({
      body: tableRows,
      margin: { top: 10 },
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
  {enrolledClassesData.filter((clz) => clz.date === activeDay)
    .map((clz) => (
        <tr key={clz.id}>
          <td>{clz.time}</td>
          <td>Grade {clz.grade}</td>
          <td>{clz.subject}</td>
          <td>{clz.teacher}</td>
          <td>{clz.hall}</td>
          <td>Rs.{clz.fees}</td>
        </tr>
    ))} 
    
  </tbody>
</table>
<button className="btn btn-primary" onClick={handlePrintClick}>
        Print PDF
</button>
</div> 
</div>
  </div>
);

}

export default MyTimetable;