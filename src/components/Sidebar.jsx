import React from 'react' 
import {
    FaSearch,
    FaChalkboardTeacher,
    FaCommentAlt,
    FaUser,
} from "react-icons/fa"
import {MdVerifiedUser} from "react-icons/md"
import { NavLink } from 'react-router-dom'
import Logout from './logout/Logout'
import "./Sidebar.css";

const Sidebar = ({ children }) => {

    const menuItem = [
        {
            path: "/",
            name: "Cari Tutor",
            icon: <FaSearch />
        },
        {
            path: "/chat",
            name: "Pesan",
            icon: <FaCommentAlt />
        },
        {
            path: "/profile",
            name: "Profil",
            icon: <FaUser />
        },
        {
            path: "/tutor",
            name: "Jadi Tutor",
            icon: <FaChalkboardTeacher />
        },
        {
            path: "/verify",
            name: "Verify Tutor",
            icon: <MdVerifiedUser />
        },
    ]

    return (
        <div className="container">
            <div className="sidebar">
                <div className="top_section">
                    <h1 className="logo">Peers</h1>
                </div>
                <div className="listItem">
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
                
                </div>
                <div >
                    <Logout/>
                </div>
                
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar