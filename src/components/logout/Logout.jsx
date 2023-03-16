import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaSignOutAlt} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

function Logout() {
    const {dispatch} = React.useContext(AuthContext);
    const navigate = useNavigate();
    const HandleLogout = () => {
      
      dispatch({type: "LOGOUT"})
      navigate("/");
      
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