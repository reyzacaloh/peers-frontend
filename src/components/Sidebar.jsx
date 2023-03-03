import React from 'react' 
import {
    FaChalkboardTeacher,
    FaCommentAlt,
} from "react-icons/fa"
import { NavLink } from 'react-router-dom'


const Sidebar = ({ children }) => {

    const menuItem = [
        {
            path: "/find-tutor",
            name: "Cari Tutor",
            icon: <FaChalkboardTeacher />
        },
        {
            path: "/chat",
            name: "Pesan",
            icon: <FaCommentAlt />
        },
    ]

    return (
        <div className="container">
            <div className="sidebar" style={{display: window.location.pathname === "/" ? "none" : "initial"}}>
                <div className="top_section">
                    <h1 className="logo">Peers</h1>
                </div>
                {
                    menuItem.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeclassname="active">
                            <div className="icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar