


import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { updateUser, getProfile, deleteUser } from "../apicalls/helper";
import '../stylesheets/layout.css'
import '../stylesheets/theme.css'
import '../stylesheets/alignments.css'
import '../stylesheets/textelements.css'
import '../stylesheets/custom-component.css'
import '../stylesheets/form-elements.css'

function StdProfileSideNav({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({});
  const [apiData1, setApiData1] = useState({});
  

  const userMenu = [
    {
      title: "Timetables",
      paths: ["/myTimetable"],
      icon: <i className="ri-calendar-todo-line"></i>,
      onClick: () => navigate("/myTimetable"),
    },
    {
      title: "Assignments",
      paths: ["/myTimetable"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/myTimetable"),
    },
    {
      title: "Study Materials",
      paths: ["/myExamTimetable"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => navigate("/sms"),
    },
    {
        title: "Payments",
        paths: ["/payOnline","/"],
        icon: <i className="ri-money-dollar-circle-line"></i>,
        onClick: () => navigate("/payOnline"),
      },
      {
        title: "Support Services",
        paths: ["/Stickets","/user/classEnrolling"],
        icon: <i className="ri-home-line"></i>,
        onClick: () => navigate("/Stickets"),
      },  
    {
      title: "Logout",
      paths: ["/logout"],
      icon: <i className="ri-home-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/plogin");
      },
    },
  ];


  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await getUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        setMenu(userMenu);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login"); //if there is problem with token user navigate login
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    let usernameFrom = localStorage.getItem("userName");
    console.log(usernameFrom);
    getProfile(usernameFrom).then((results) => {
      let apiData = results.data;
      setApiData1(results.data);

      console.log(results.data._id);    
      setMenu(userMenu);

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

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("/user/classEnrolling") &&     
        paths.includes("/mainTimetable")
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="layout">
      <div className="flex gap-2 w-full h-full h-100">
        <div className="sidebar">
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
            <h1 className="text-2xl text-white">Thilina Institute Student</h1>
            <div>
              <div className="flex gap-1 items-center">
                <i class="ri-user-line"></i>
                <h1 className="text-md text-white underline">{apiData1.studentId}</h1>
              </div>
              <span>Role : {apiData1.isAdmin ? "Admin" : "User"}</span>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default StdProfileSideNav;

