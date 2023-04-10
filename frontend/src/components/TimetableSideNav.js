//import React from "react";
//import '../stylesheets/timetable-sidenav.css'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import '../stylesheets/layout.css'
import '../stylesheets/theme.css'
import '../stylesheets/alignments.css'
import '../stylesheets/textelements.css'
import '../stylesheets/custom-component.css'
import '../stylesheets/form-elements.css'

function TimetableSideNav({ children }){
/*
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";


  const { user } = useSelector((state) => state.users);
  const role = ""
  const dispatch = useDispatch();
  
  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          role="admin";
        } else {
          role="student";
        }
      } else {
        alert("err");
      }
    } catch (err) {
      dispatch(HideLoading());
      alert(err);
    }
  };

  
/* const [role, setRole] = useState("");

    useEffect(() => {
    fetch("/api/getUserRole")
      .then((response) => response.json())
      .then((data) => setRole(data.role))
      .catch((error) => console.error(error));
    }, []);


    let links;
    if (role === "admin") {
      links = (
        <div class="sidenav text-center">
        <a className='sidenav-a' href="/addClass">Add New Classes</a>
        <a className='sidenav-a' href="/allClasses">Class Schedule</a>
        <a className='sidenav-a' href="#examSchedule">Exam Schedule</a>
      </div>
      );
    } else if (role === "student") {
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
    } else if (role === "teacher") {
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
  
    return <div className="sidenav">{links}</div>; 


   return(
      <div class="sidenav text-center">
        <a className='sidenav-a' href="/addClass">Add New Classes</a>
        <a className='sidenav-a' href="/allClasses">Class Schedule</a>
        <a className='sidenav-a' href="#examSchedule">Exam Schedule</a>
      </div>
  
    )
}*/
const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userMenu = [
    {
      title: "Main Class Schedule",
      paths: ["/mainTimetable"],
      icon: <i className="ri-calendar-todo-line"></i>,
      onClick: () => navigate("/mainTimetable"),
    },
    {
      title: "My Class Schedule",
      paths: ["/user/reports"],
      icon: <i className="ri-table-line"></i>,
      onClick: () => navigate("#/myTimetable"),
    },
    {
      title: "Exam Schedule",
      paths: ["/profile"],
      icon: <i className="ri-todo-line"></i>,
      onClick: () => navigate("#/myExams"),
    },
    {
      title: "Online Classes",
      paths: ["/profile"],
      icon: <i className="ri-global-line"></i>,
      onClick: () => navigate("#/onlineClasses"),
    },
  ];

  const adminMenu = [
    {
      title: "Main Class Schedule",
      paths: ["/mainTimetable"],
      icon: <i className="ri-calendar-todo-line"></i>,
      onClick: () => navigate("/mainTimetable"),
    },
    {
      title: "Exam Schedule",
      paths: ["/exams", "/user/write-exam"],
      icon: <i className="ri-todo-line"></i>,
      onClick: () => navigate("#/mainTimetable"),
    },
    {
      title: "Add New Class",
      paths: ["/addClass"],
      icon: <i className="ri-menu-add-fill"></i>,
      onClick: () => navigate("/addClass"),
    },
    {
      title: "Edit Class ",
      paths: ["/allClasses","/updateClass/:id","/deleteClass/:id"],
      icon: <i className="ri-edit-box-line"></i>,
      onClick: () => navigate("/allClasses"),
    },
  ];

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login");
    }
  }, []);

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/timetable") &&
        paths.includes("/allClasses")
      ) {
        return true;
      }
      if (
        activeRoute.includes("#/user/write-exam") &&
        paths.includes("#/user/write-exam")
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="layout">
      <div className="flex gap-2 w-full h-full h-100">
        <div className="sidebar ">
          <div className="menu ">
            {menu.map((item, index) => {
               return (
                <div
                  className={`menu-item ${
                    getIsActiveOrNot(item.paths) && "active-menu-item"
                  }`}
                  key={index}
                  onClick={item.onClick}
                >
                  {item.icon}
                  {!collapsed && <span>{item.title}</span>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header flex justify-between">
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            {collapsed && (
              <i
                className="ri-menu-line"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
            <h1 className="text-2xl text-white">Thilina Institute Timetable</h1>
            <div>
              <div className="flex gap-1 items-center">
                <i class="ri-user-line"></i>
                <h1 className="text-md text-white underline">{user?.name}</h1>
              </div>
              <span>Role : {user?.isAdmin ? "Admin" : "User"}</span>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default TimetableSideNav;