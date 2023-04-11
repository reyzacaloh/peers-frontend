import React, { useEffect } from "react";
import {
  FaSearch,
  FaChalkboardTeacher,
  FaCommentAlt,
  FaUser, FaEdit,
} from "react-icons/fa";
import { MdVerifiedUser } from "react-icons/md";
import { NavLink } from "react-router-dom";
import Logout from "./logout/Logout";
import "./Sidebar.css";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const Sidebar = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const menuItem = [
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
      path: "/tutor",
      name: "Jadi Tutor",
      icon: <FaChalkboardTeacher />,
    },
    {
      path: "/verify",
      name: "Verify Tutor",
      icon: <MdVerifiedUser />,
    },
    {
      path: "/schedule",
      name: "[Temp] Schedule",
      icon: <FaEdit />,
    },
  ];

  useEffect(() => {
    const setIsOpen = () => setOpen(true);
    window.addEventListener("resize", setIsOpen);


    return () => window.removeEventListener("resize", setIsOpen);
  });
  return (
    <div className="container">
      <div data-testid="overlay" className={`overlay ${open ? "" : "hide"}`}></div>
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
              className="link"
              activeclassname="active"
            >
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
          <Logout />
        </div>
      </div>
      <div className="page">{children}</div>
    </div>
  );
};

export default Sidebar;
