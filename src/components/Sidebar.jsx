/* eslint-disable no-restricted-globals */
import React, { useContext, useEffect, useState } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,
    SLinkNotification,
    SLogo,
    SSidebar,
    SSidebarButton,
    SLayout
} from "./styles";
import {
    FaSearch,
    FaChalkboardTeacher,
    FaCommentAlt,
    FaUser,
    FaCalendar
} from "react-icons/fa"
import {
  AiOutlineLeft,
} from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import { useLocation } from 'react-router-dom'
import Logout from './logout/Logout'
import logo from "../images/logo_small.png"
import { AuthContext } from "../contexts/AuthContext";
import { getCurrentUser } from "../utils/common";
import "./Sidebar.css";

const Sidebar = ({ children }) => {
    const { currentUser, setCurrentUser } = useContext(AuthContext);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [open, setOpen] = useState(true);
    const { pathname } = useLocation();

    const menuItem = [
        {
            to: "/",
            label: "Cari Tutor",
            icon: <FaSearch />,
            notification: 0
        },
        {
            to: "/chat",
            label: "Pesan",
            icon: <FaCommentAlt />,
            notification: 0
        },
        {
            to: "/profile",
            label: "Profil",
            icon: <FaUser />,
            notification: 0
        },
        {
            to: "/schedule",
            label: "Schedule",
            icon: <FaCalendar />,
            notification: 0
        },
    ]
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth > 1024) {
          setOpen(true);
        }
        else{
          setOpen(false);
        }
      };
      getCurrentUser(setCurrentUser);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.role]);
    
    const TutorMenu = ({ role }) => {
      return (
        <SLinkContainer key="TutorMenu">
        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}} to={role === 2 ? "/tutor/dashboard" : "/tutor"}>
          <SLinkIcon>{<FaChalkboardTeacher></FaChalkboardTeacher>}</SLinkIcon>
          {sidebarOpen && (
            <>
              <SLinkLabel>{role === 2 ? "Dashboard" : "Jadi Tutor"}</SLinkLabel>
            </>
          )}
        </SLink>
      </SLinkContainer>
      );
    };
    
    const VerifyTutor = ({ role }) => {
      return (
        <SLinkContainer  key="VerifyTutor" style={role === 1 ? {} : {display:`none`}}>
        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}} to={"/verify"}>
          <SLinkIcon>{<MdVerifiedUser></MdVerifiedUser>}</SLinkIcon>
          {sidebarOpen && (
            <>
              <SLinkLabel>Verify Tutor</SLinkLabel>
            </>
          )}
        </SLink>
      </SLinkContainer>
      );
    };

    return (
      <SLayout>
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo>
                <img src={logo} alt="logo" />
            </SLogo>
            <SDivider />
            {menuItem.map(({ icon, label, notification, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>
                                {/* if notifications are at 0 or null, do not display */}
                                {!!notification && (
                                    <SLinkNotification>{notification}</SLinkNotification>
                                )}
                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <TutorMenu role={currentUser.role} />
            <VerifyTutor role={currentUser.role} />
            <Logout></Logout>
        </SSidebar>
            <main>{children}</main>
      </SLayout>
    );
}

export default Sidebar
