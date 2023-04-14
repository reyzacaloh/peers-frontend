/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
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
} from "react-icons/fa"
import {
  AiOutlineLeft,
} from "react-icons/ai";
import { MdVerifiedUser } from "react-icons/md";
import { useLocation } from 'react-router-dom'
import Logout from './logout/Logout'
import logo from "../images/logo_small.png"


const Sidebar = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
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
            to: "/tutor",
            label: "Jadi Tutor",
            icon: <FaChalkboardTeacher />,
            notification: 0
        },
        {
            to: "/verify",
            label: "Verify Tutor",
            icon: <MdVerifiedUser />,
            notification: 0
        },
    ]

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
            <Logout></Logout>
        </SSidebar>
            <main>{children}</main>
      </SLayout>
    );
}

export default Sidebar