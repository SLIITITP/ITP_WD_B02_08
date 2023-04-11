import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyTimetable() {
//view timetabe 
const [classes, setClasses] = useState([]);
const [activeDay, setActiveDay] = useState('Monday');
const [filteredClasses, setFilteredClasses] = useState(classes);

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
  axios
    .get('http://localhost:9090/class/allClasses')
    .then((res) => {
      setClasses(res.data);
    })
    .catch((err) => {
      alert(err.message);
    });
}, []);


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
               className={`nav-link ${activeDay === button.date ? 'active' : ''}`}
               onClick={() => handleDayClick(button.date)}
             >
               {button.label}
             </button>
           </li>
         ))}
       </ul>
     </nav>
<div className="table-responsive">
  <table className="table table-striped table-hover">
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
      {classes.filter((clz) => clz.date === activeDay)
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
</div>
</div>
</div>
);

}

export default MyTimetable;