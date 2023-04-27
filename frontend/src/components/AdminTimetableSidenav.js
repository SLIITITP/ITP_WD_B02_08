
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { tgetUserInfo } from "../apicalls/teachers";
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
import {
  updateUser,
  getProfileTeacher,
  deleteUser,
  updateTeacher,
} from "../apicalls/helper";
import { useAuthStore } from "../redux/store1";

function AdminTimetableSideNav({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({});
  const [apiData1, setApiData1] = useState({});
  const [file, setFile] = useState();
  const { username } = useAuthStore((state) => state.auth);


  const adminMenu = [
    {
      title: "Main Class Schedule",
      paths: ["/adminMainTimetable"],
      icon: <i className="ri-calendar-todo-line"></i>,
      onClick: () => navigate("/adminMainTimetable"),
    },
    {
      title: "Add New Class",
      paths: ["/addClass"],
      icon: <i className="ri-menu-add-line"></i>,
      onClick: () => navigate("/addClass"),
    },
    {
      title: "Edit Class Schedule",
      paths: ["/allClasses"],
      icon: <i className="ri-edit-box-fill"></i>,
      onClick: () => navigate("/allClasses"),
    },
    {
      title: "Exam Schedule",
      paths: ["/adminExamSchedule"],
      icon: <i className="ri-layout-top-2-line"></i>,
      onClick: () => navigate("/adminExamSchedule"),
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

  const getUserData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await tgetUserInfo();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } 
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
    if (localStorage.getItem("token")) {
      getUserData();
    } else {
      navigate("/login"); //if there is problem with token user navigate login
    }
  }, []);

  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      if (
        activeRoute.includes("#") &&
        paths.includes("#")
      ) {
        return true;
      }
      if (
        activeRoute.includes("#") &&
        paths.includes("#")
      ) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    console.log(username);
    let usernameFrom = localStorage.getItem("userName");
    // username = ;
    console.log(usernameFrom);
    if (username === "") {
      let userNameReload = localStorage.getItem("userName");
      getProfileTeacher(userNameReload).then((results) => {
        let apiData = results.data;
        setApiData1(results.data);

      console.log(results.data.isAdmin);
      if (results.data.isAdmin) {
        setMenu(adminMenu);
      } 
        console.log(results);
        setFile(apiData?.profile || "");
        setApiData({
          firstName: apiData?.firstName || "",
          lastName: apiData?.lastName || "",
          email: apiData?.email || "",
          teaId: apiData?.teaId || "",
          address: apiData?.address || "",
          profile: apiData?.profile || "",
          id: apiData._id,
          teacherId: apiData?.teacherId,
          isAdmin: apiData?.isAdmin || "",

        });
      });
    } else {
      getProfileTeacher(username).then((results) => {
        let apiData = results.data;
        setApiData1(results.data);

      console.log(results.data.isAdmin);
      if (results.data.isAdmin) {
        setMenu(adminMenu);
      }
        console.log(results);
        setFile(apiData?.profile || "");
        setApiData({
          firstName: apiData?.firstName || "",
          lastName: apiData?.lastName || "",
          email: apiData?.email || "",
          teaId: apiData?.teaId || "",
          address: apiData?.address || "",
          profile: apiData?.profile || "",
          id: apiData._id,
          teacherId: apiData?.teacherId,
          isAdmin: apiData?.isAdmin || "",

        });
      });
    }
  }, []);


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
            <h1 className="text-2xl text-white">Thilina Institute Online Exam Portal</h1>
            <div>
              <div className="flex gap-1 items-center">
                <i class="ri-user-line"></i>
                <h1 className="text-md text-white underline">{apiData1.teacherId}</h1>
              </div>
              <span>Role : {apiData1.isAdmin ? "Teacher" : "User"}</span>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminTimetableSideNav;

