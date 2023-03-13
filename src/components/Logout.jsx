import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
function Logout() {

    const handleLogout = () => {
      
      localStorage.removeItem("jwtToken");
      
    };
  
    return (
      <NavLink 
      className="link"
      activeclassname="active"
      onClick={handleLogout} 
      >
        <div className="icon"><FaPowerOff/></div>
        <div className="link_text">Logout</div>
    </NavLink>
    );
  }
  
export default Logout;