/* eslint-disable no-restricted-globals */
import React, { useState } from 'react' 
import {
    FaSearch,
    FaChalkboardTeacher,
    FaCommentAlt,
    FaUser,
} from "react-icons/fa"
import {MdVerifiedUser} from "react-icons/md"
import { NavLink } from 'react-router-dom'
import Logout from './logout/Logout'
import "tailwindcss/tailwind.css";
import control from "../images/control.png"
import logo from "../images/logo_small.png"


const Sidebar = ({ children }) => {
    const [open, setOpen] = useState(true);

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
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={control}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
          alt=''
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
            alt='Peers'
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Peers
          </h1>
        </div>

        <ul className="pt-6">
            {
                menuItem.map((item, index) => (
                    <li>
                    <NavLink className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                    ${menuItem.gap ? "mt-9" : "mt-2"} `}
                    to={item.path} key={index}>
                        <div className="icon">{item.icon}</div>
                        <div className={`${!open && "hidden"} origin-left duration-200`}>
                            {item.name}
                        </div>
                    </NavLink>
                    </li>
                ))
            }
            <Logout/>
        </ul>
        </div>
        <main>{children}</main>
    </div>
    )
}

export default Sidebar