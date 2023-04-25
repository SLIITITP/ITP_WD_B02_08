import { message } from "antd";
import React, { useEffect, useState } from "react";
import { authenticateTeacher, getProfileTeacher} from "../apicalls/helper";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { useAuthStore } from "../redux/store1";
import '../stylesheets/layout.css'
import '../stylesheets/theme.css'
import '../stylesheets/alignments.css'
import '../stylesheets/textelements.css'
import '../stylesheets/custom-component.css'
import '../stylesheets/form-elements.css'

function TeacherTimetableSideNav({ children }){
    
    const { user } = useSelector((state) => state.users);
    const [userSet,setUserSet]=useState();
    const [menu, setMenu] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const un = localStorage.getItem('userName')

   const getUserData = async (username) => {
        try {
          console.log('call to get user');
          dispatch(ShowLoading());
          const response = await getProfileTeacher(username);
          console.log(response)
          dispatch(HideLoading());
          if (response.success) {
            // dispatch(SetUser(response.data));
            setUserSet("response.data.username")             
          } 
        } catch (error) {
          //navigate("/");
          dispatch(HideLoading());
          message.error(error.message);
        }
        setMenu(teacherMenu);
      };
  

  
  const { username } = useAuthStore((state) => state.auth);
 
  {/*const getUserData = async (dispatch) => {
    try {
    console.log(username);
    let usernameFrom = localStorage.getItem("userName");
    // username = ;
    console.log(usernameFrom);
    if (username === "") {
      let userNameReload = localStorage.getItem("userName");
      const response = getProfileTeacher(userNameReload);
      console.log(response)
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
          setMenu(teacherMenu);
      } else {
        message.error(response.message);
      }
    }} 
      catch (error) {
      message.error(error.message);
      return;
    }
  };*/}
      

      const teacherMenu = [
        {
          title: "Main Class Schedule",
          paths: ["/teacherMainTimetable"],
          icon: <i className="ri-calendar-todo-line"></i>,
          onClick: () => navigate("/teacherMainTimetable"),
        },
        {
          title: "My Class Schedule",
          paths: ["/teacherMyTimetable"],
          icon: <i className="ri-table-line"></i>,
          onClick: () => navigate("/teacherMyTimetable"),
        },
        {
          title: "Online Classes",
          paths: ["/profile"],
          icon: <i className="ri-global-line"></i>,
          onClick: () => navigate("#/onlineClasses"),
        },
      ];

      useEffect(() => {
        if (localStorage.getItem("token")) {
          let username = localStorage.getItem('userName')
          getUserData(username);
        }
      }, []);


      const activeRoute = window.location.pathname;

      const getIsActiveOrNot = (paths) => {
        if (paths.includes(activeRoute)) {
          return true;
        } else {
          if (
            activeRoute.includes("#/") &&
            paths.includes("#/")
          ) {
            return true;
          }
          if (
            activeRoute.includes("#/") &&
            paths.includes("#")
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
                <h1 className="text-md text-white underline">{un}</h1>
              </div>
              <span>Role : Teacher</span>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );

}

export default TeacherTimetableSideNav;