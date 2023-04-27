
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

function ProtectedRoute({ children }) {
    const { user } = useSelector((state) => state.users);
    const [menu, setMenu] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const adminMenu = [
        {
            title: "Home",
            paths: ["/home"],
            icon: <i className="ri-home-line"></i>,
            onClick: () => navigate("/home"),
        },
        {
            title: "Add Payment",
            paths: ["/addPayment"],
            icon: <i className="ri-home-line"></i>,
            onClick: () => navigate("/addPayment"),
        },
        {
            title: "View Payment",
            paths: ["/viewPayment"],
            icon: <i className="ri-bar-chart-line"></i>,
            onClick: () => navigate("/viewPayment"),
        },
        {
            title: "Salary Calculate",
            paths: ["/salary/calculate"],
            icon: <i className="ri-user-line"></i>,
            onClick: () => navigate("/salary/calculate"),
        },
        {
            title: "Salary History",
            paths: ["/salary/history"],
            icon: <i className="ri-user-line"></i>,
            onClick: () => navigate("/salary/history"),
        },
        {
            title: "Subject Add or Update",
            paths: ["/subject/addOrUpdate"],
            icon: <i className="ri-user-line"></i>,
            onClick: () => navigate("/subject/addOrUpdate"),
        },
        {
            title: "Logout",
            paths: ["/logout"],
            icon: <i className="ri-logout-box-line"></i>,
            onClick: () => {
                localStorage.removeItem("token");
                navigate("/login");
            },
        },
    ];

    const userMenu = [
        {
            title: "Home",
            paths: ["/home"],
            icon: <i className="ri-home-line"></i>,
            onClick: () => navigate("/home"),
        },
        {
            title: "Pay Class fees",
            paths: ["/payOnline", "/payment/checkout"],
            icon: <i className="ri-file-list-line"></i>,
            onClick: () => navigate("/payOnline"),
        },
        {
            title: "Payment History",
            paths: ["/payHistory"],
            icon: <i className="ri-bar-chart-line"></i>,
            onClick: () => navigate("/payHistory"),
        },
        {
            title: "Logout",
            paths: ["/logout"],
            icon: <i className="ri-logout-box-line"></i>,
            onClick: () => {
                localStorage.removeItem("token");
                navigate("/login");
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
                activeRoute.includes("/payment/checkout") &&
                paths.includes("/payOnline")
            ) {
                return true;
            }
            if (
                activeRoute.includes("/user/write-exam") &&
                paths.includes("/user/write-exam")
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
                        <h1 className="text-2xl text-white">Financial Management - Thilina Institute</h1>
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

export default ProtectedRoute;