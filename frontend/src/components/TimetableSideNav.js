import React from "react";
import '../stylesheets/timetable-sidenav.css'
function TimetableSideNav(){

       /* const [role, setRole] = useState("");

    useEffect(() => {
    fetch("/api/getUserRole")
      .then((response) => response.json())
      .then((data) => setRole(data.role))
      .catch((error) => console.error(error));
    }, []);


    let links;
    if (props.role === "admin") {
      links = (
        <>
          <a className="sidenav-a" href="#about">
            Add New Classes
          </a>
          <a className="sidenav-a" href="#services">
            Class Schedule
          </a>
          <a className="sidenav-a" href="#clients">
            Exam Schedule
          </a>
        </>
      );
    } else if (props.role === "student") {
      links = (
        <>
          <a className="sidenav-a" href="#about">
            My Class Schedule
          </a>
          <a className="sidenav-a" href="#services">
            Main Class Schedule
          </a>
          <a className="sidenav-a" href="#clients">
            Exam Schedule
          </a>
        </>
      );
    } else if (props.role === "teacher") {
      links = (
        <>
          <a className="sidenav-a" href="#about">
            My Classes
          </a>
          <a className="sidenav-a" href="#services">
            Main Class Schedule
          </a>
        </>
      );
    }
  
    return <div className="sidenav">{links}</div>; */


    return(
      <div class="sidenav">
        <a className='sidenav-a' href="/addClass">Add New Classes</a>
        <a className='sidenav-a' href="/allClasses">Class Schedule</a>
        <a className='sidenav-a' href="#examSchedule">Exam Schedule</a>
      </div>
  
    )
}

export default TimetableSideNav;