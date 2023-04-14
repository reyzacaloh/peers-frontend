import React, { useContext, useEffect } from "react";
import {
  FaSearch,
  FaChalkboardTeacher,
  FaCommentAlt,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logout from "./logout/Logout";
import "./Sidebar.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { AuthContext } from "../contexts/AuthContext";
import { getCurrentUser } from "../utils/common";

const TutorMenu = ({ role }) => {
  return (
    <NavLink
      to={role === 2 ? "/tutor/dashboard" : "/tutor"}
      className="link"
      activeclassname="active"
    >
      <div className="icon">
        <FaChalkboardTeacher />
      </div>
      <div className="link_text">{role === 2 ? "Dashboard" : "Jadi Tutor"}</div>
    </NavLink>
  );
};

const VerifyTutor = ({ role }) => {
  return (
    <NavLink
      to={"/verify"}
      className={`link ${role !== 1 && "hide_link"}`}
      activeclassname="active"
    >
      <div className="icon">
        <MdVerifiedUser />
      </div>
      <div className="link_text">{role === 1 && "Verify Tutor"}</div>
    </NavLink>
  );
};

const Sidebar = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  let menuItem = [
    {
      path: "/",
      name: "Cari Tutor",
      icon: <FaSearch />,
    },
    {
      path: "/chat",
      name: "Pesan",
      icon: <FaCommentAlt />,
    },
    {
      path: "/profile",
      name: "Profil",
      icon: <FaUser />,
    },
    {
      path: "/schedule",
      name: "Schedule",
      icon: <FaCalendar />,
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setOpen(true);
      }
    };
    getCurrentUser(setCurrentUser);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser.role]);
  return (
    <div className="container">
      <div
        data-testid="overlay"
        className={`overlay ${open ? "" : "hide"}`}
      ></div>
      <div className="navbar_top">
        <div className="icon_section">
          <MenuOutlinedIcon
            data-testid="menu_icon"
            sx={{ fontSize: "30px" }}
            className="menu_icon"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="app_icon">
          <img className="peers_icon" src="app-icon.png" alt="app-icon-peers" />
        </div>
      </div>
      <div className={`sidebar ${open ? "" : "hide"}`}>
        <div className="top_section">
          <CloseRoundedIcon
            data-testid="menu_icon2"
            sx={{ fontSize: "25px" }}
            className="close_icon"
            onClick={() => setOpen(!open)}
          />
          <h1 className="logo">Peers</h1>
        </div>
        <div className="listItem">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={`link ${
                currentUser.role !== 1 && item.path === "/verify"
                  ? "hide_link"
                  : ""
              }`}
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
          <TutorMenu role={currentUser.role} />
          <VerifyTutor role={currentUser.role} />
          <Logout />
        </div>
      </div>
      <div className="page">{children}</div>
    </div>
  );
};

export default Sidebar;
