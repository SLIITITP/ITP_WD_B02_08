import { message } from "antd";
import React, { useEffect, useState } from "react";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";
import { updateUser, getProfile, deleteUser } from "../apicalls/helper";
import {GrNotes} from 'react-icons/gr'
import {GrDocumentPdf} from 'react-icons/gr'
import {GrDocumentVideo} from 'react-icons/gr'
import {GiArchiveResearch} from 'react-icons/gi'
import {MdDashboardCustomize} from 'react-icons/md'
import '../stylesheets/layout.css'
import '../stylesheets/theme.css'
import '../stylesheets/alignments.css'
import '../stylesheets/textelements.css'
import '../stylesheets/custom-component.css'
import '../stylesheets/form-elements.css'

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [apiData, setApiData] = useState({});
  const [apiData1, setApiData1] = useState({});
  

   const userMenu = [
    {
      title: "Assignments",
      paths: ["/s1" ],
      icon: <i class="ri-book-line"></i>,
      onClick: () => navigate("/s1"),
    },
    {
      title: "Reports",
      paths: ["/charts"],
      icon: <i className="ri-bar-chart-line"></i>,
      onClick: () => navigate("/charts"),
    },
    {
        title: "Feedback",
        paths: ["/FeedbackAss"],
        icon: <i class="ri-feedback-line"></i>,
        onClick: () => navigate("/FeedbackAss"),
    },
    {
        title: "Submissions",
        paths: ["/T/D","/sub"],
        icon: <i class="ri-question-answer-line"></i>,
        onClick: () => navigate("/T/D"),
      },
    {
      title: "Profile",
      paths: ["/profile"],
      icon: <i className="ri-user-line"></i>,
      onClick: () => navigate("/profile"),
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

  const adminMenu = [
    // {
    //   title: "DASHBOARD",
    //   paths: ["/smt"],
    //   icon: <MdDashboardCustomize className="ri-home-line"></MdDashboardCustomize>,
    //   onClick: () => navigate("/smt"),
    // },
    // {
    //   title: "FEEDBACKS",
    //   paths: ["/fbs/e"],
    //   icon: <i className="ri-file-list-line"></i>,
    //   onClick: () => navigate("/fbs/e"),
    // },
    // {
    //     title: "NOTES",
    //     paths: ["/smN","/smN/add"],
    //     icon: <GrNotes className="ri-bar-chart-line bg-white"></GrNotes>,
    //     onClick: () => navigate("/smN"),
    //   },
    //   {
    //     title: " PDF",
    //     paths: ["/smP","/smP/add"],
    //     icon: <GrDocumentPdf className="ri-bar-chart-line bg-white"></GrDocumentPdf>,
    //     onClick: () => navigate("/smP"),
    //   },
    //   {
    //     title: "RECORDS",
    //     paths: ["/smRe","/smRe/add"],
    //     icon: <GrDocumentVideo className="ri-bar-chart-line bg-white"></GrDocumentVideo>,
    //     onClick: () => navigate("/smRe"),
    //   },
    //   {
    //     title: "RESEARCH",
    //     paths: ["/smR","/smR/add"],
    //     icon: <GiArchiveResearch className="ri-bar-chart-line"></GiArchiveResearch>,
    //     onClick: () => navigate("/smR"),
    //   },
    // {
    //   title: "PROFILE",
    //   paths: ["/profile"],
    //   icon: <i className="ri-user-line"></i>,
    //   onClick: () => navigate("/profile"),
    // },
    // {
    //   title: "LOGOUT",
    //   paths: ["/logout"],
    //   icon: <i className="ri-logout-box-line"></i>,
    //   onClick: () => {
    //     localStorage.removeItem("token");
    //     navigate("/plogin");
    //   },
    // },
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
      navigate("/login"); //if there is problem with token user navigate login
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    let usernameFrom = localStorage.getItem("userName");
    if(usernameFrom == 'undefined' || usernameFrom == null || usernameFrom == ''){
      navigate("/plogin");
    }
    if (localStorage.getItem("token1")) {
      console.log(usernameFrom);
      navigate("/");
    } else {
       //if there is problem with token user navigate login
       console.log(usernameFrom);
    }
    console.log(usernameFrom);
    getProfile(usernameFrom).then((results) => {
      let apiData = results.data;
      console.log(results.data)
      setApiData1(results.data);

      console.log(results.data.isAdmin);
      if (results.data.isAdmin) {
        setMenu(adminMenu);
      } else {
        setMenu(userMenu);
      }
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
        activeRoute.includes("/smt") &&
        
        paths.includes("/smt")
      ) {
        return true;
      }
      if (
        activeRoute.includes("/sms") &&
        paths.includes("/sms")
      ) {
        return true;
      }
    }
    return false;
  };

  return (

      <div className="layout !fixed">
          <div className="!flex gap-6 w-full h-full ">
              <div className="sidebar !h-screen z-auto transition-transform -translate-x-full sm:translate-x-0">
                  <div className="menu ">
                      {menu.map((item, index) => {
                          return (
                              <div
                                  className={`menu-item ${getIsActiveOrNot(item.paths) && "active-menu-item"
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
                      <h1 className="text-2xl text-white">STUDY MATERIAL SECTION</h1>
                      <div>
                          <div className="flex gap-1 items-center">
                              <i class="ri-user-line"></i>
                              <h1 className="text-md text-white underline">{apiData1.teacherId}</h1>
                          </div>
                          <span className="text-md text-white">Role : {apiData1.isAdmin ? "Admin" : "User"}</span>
                      </div>
                  </div>
                  <div className="content">{children}</div>
              </div>
          </div>
      </div>
  );
}

export default ProtectedRoute;

























// import { message } from "antd";
// import React, { useEffect, useState } from "react";
// import { getUserInfo } from "../apicalls/users";
// import { useDispatch, useSelector } from "react-redux";
// import { SetUser } from "../redux/usersSlice.js";
// import { useNavigate } from "react-router-dom";
// import { HideLoading, ShowLoading } from "../redux/loaderSlice";
// import { updateUser, getProfile, deleteUser } from "../apicalls/helper";
// import '../stylesheets/layout.css'
// import '../stylesheets/theme.css'
// import '../stylesheets/alignments.css'
// import '../stylesheets/textelements.css'
// import '../stylesheets/custom-component.css'
// import '../stylesheets/form-elements.css'

// function ProtectedRoute({ children }) {
//   const { user } = useSelector((state) => state.users);
//   const [menu, setMenu] = useState([]);
//   const [collapsed, setCollapsed] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [apiData, setApiData] = useState({});
//   const [apiData1, setApiData1] = useState({});
  

//   const userMenu = [
//     {
//       title: "Assignments",
//       paths: ["/s1" ],
//       icon: <i class="ri-book-line"></i>,
//       onClick: () => navigate("/s1"),
//     },
//     {
//       title: "Reports",
//       paths: ["/charts"],
//       icon: <i className="ri-bar-chart-line"></i>,
//       onClick: () => navigate("/charts"),
//     },
//     {
//         title: "Feedback",
//         paths: ["/FeedbackAss"],
//         icon: <i class="ri-feedback-line"></i>,
//         onClick: () => navigate("/FeedbackAss"),
//     },
//     {
//         title: "Submissions",
//         paths: ["/T/D","/sub"],
//         icon: <i class="ri-question-answer-line"></i>,
//         onClick: () => navigate("/T/D"),
//       },
//     {
//       title: "Profile",
//       paths: ["/profile"],
//       icon: <i className="ri-user-line"></i>,
//       onClick: () => navigate("/profile"),
//     },
//     {
//       title: "Logout",
//       paths: ["/logout"],
//       icon: <i className="ri-logout-box-line"></i>,
//       onClick: () => {
//         localStorage.removeItem("token");
//         navigate("/plogin");
//       },
//     },
//   ];

//   const adminMenu = [
//     {
//       title: "Assignments",
//       paths: ["/a2","/a1"],
//       icon: <i className="ri-home-line"></i>,
//       onClick: () => navigate("/a2"),
//     },
//     {
//       title: "Feedbacks",
//       paths: ["/viewFeed","/emailAss"],
//       icon: <i className="ri-file-list-line"></i>,
//       onClick: () => navigate("/viewFeed","/emailAss"),
//     },
//     {
//       title: "Evaluations",
//       paths: ["/test"],
//       icon: <i className="ri-bar-chart-line"></i>,
//       onClick: () => navigate("/test"),
//     },
//     {
//       title: "Profile",
//       paths: ["/profile"],
//       icon: <i className="ri-user-line"></i>,
//       onClick: () => navigate("/profile"),
//     },
//     {
//       title: "Logout",
//       paths: ["/logout"],
//       icon: <i className="ri-logout-box-line"></i>,
//       onClick: () => {
//         localStorage.removeItem("token");
//         navigate("/plogin");
//       },
//     },
//   ];

//   const getUserData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getUserInfo();
//       dispatch(HideLoading());
//       if (response.success) {
//         dispatch(SetUser(response.data));
//         if (response.data.isAdmin) {
//           setMenu(adminMenu);
//         } else {
//           setMenu(userMenu);
//         }
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       navigate("/login"); //if there is problem with token user navigate login
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     let usernameFrom = localStorage.getItem("userName");
//     console.log(usernameFrom);
//     getProfile(usernameFrom).then((results) => {
//       let apiData = results.data;
//       setApiData1(results.data);

//       console.log(results.data);
//       if (results.data.isAdmin) {
//         setMenu(adminMenu);
//       } else {
//         setMenu(userMenu);
//       }
//       setApiData({
//         firstName: apiData?.firstName || "",
//         lastName: apiData?.lastName || "",
//         email: apiData?.email || "",
//         mobile: apiData?.mobile || "",
//         address: apiData?.address || "",
//         profile: apiData?.profile || "",
//         id: apiData._id,
//         studentId: apiData?.studentId || "",
//         isAdmin: apiData?.isAdmin || "",
//       });
//     });
//   }, []);

//   const activeRoute = window.location.pathname;

//   const getIsActiveOrNot = (paths) => {
//     if (paths.includes(activeRoute)) {
//       return true;
//     } else {
//       if (
//         activeRoute.includes("/a2/a1") &&
        
//         paths.includes("/a2")
//       ) {
//         return true;
//       }
//       if (
//         activeRoute.includes("/editAss") &&
//         paths.includes("/retriveAss")
//       ) {
//         return true;
//       }
//     }
//     return false;
//   };

//   return (
//     <div className="layout">
//       <div className="flex gap-2 w-full h-full h-100">
//         <div className="sidebar">
//           <div className="menu ">
//             {menu.map((item, index) => {
//                return (
//                 <div
//                   className={`menu-item ${
//                     getIsActiveOrNot(item.paths) && "active-menu-item"
//                   }`}
//                   key={index}
//                   onClick={item.onClick}
//                 >
//                   {item.icon}
//                   {!collapsed && <span>{item.title}</span>}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="body">
//           <div className="header flex justify-between">
//             {!collapsed && (
//               <i
//                 className="ri-close-line"
//                 onClick={() => setCollapsed(true)}
//               ></i>
//             )}
//             {collapsed && (
//               <i
//                 className="ri-menu-line"
//                 onClick={() => setCollapsed(false)}
//               ></i>
//             )}
//             <h1 className="text-2xl text-white">Thilina Institute Assignment Management</h1>
//             <div>
//               <div className="flex gap-1 items-center">
//                 <i class="ri-user-line"></i>
//                 <h1 className="text-md text-white underline">{apiData1.studentId}</h1>
//               </div>
//               <span>Role : {apiData1.isAdmin ? "Admin" : "User"}</span>
//             </div>
//           </div>
//           <div className="content">{children}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProtectedRoute;

