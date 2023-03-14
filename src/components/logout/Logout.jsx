import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaSignOutAlt} from 'react-icons/fa';
function Logout() {
    
    const HandleLogout = () => {
      
      localStorage.removeItem("jwtToken");
      
      
    };
  
    return (
      <NavLink 
      className="link logout"
      activeclassname="active"
      onClick={HandleLogout} 
      >
        <div className="icon"><FaSignOutAlt/></div>
        <div className="link_text">Logout</div>
    </NavLink>
    );
  }
  
export default Logout;