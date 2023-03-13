import React from 'react' 
import {
    FaSearch,
    FaChalkboardTeacher,
    FaCommentAlt,
} from "react-icons/fa"
import { NavLink } from 'react-router-dom'
import Logout from './Logout'


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
            path: "/tutor",
            name: "Jadi Tutor",
            icon: <FaChalkboardTeacher />
        },
    ]

    return (
        <div className="container">
            <div className="sidebar">
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
                
                <div style={{ display:"flex", flexDirection:"column-reverse"}}>
                    <Logout/>
                </div>
                
                
                
            </div>
            <main>{children}</main>
        </div>
    )
}

export default Sidebar