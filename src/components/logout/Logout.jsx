import React, { useState } from 'react' 
import { useNavigate, NavLink } from 'react-router-dom';
import { FaSignOutAlt} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';

function Logout() {
    const {dispatch} = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [open, setOpen] = useState(true);
    const HandleLogout = () => {
      
      dispatch({type: "LOGOUT"})
      navigate("/");
      
    };
  
    return (
      <NavLink className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
      ${HandleLogout.gap ? "mt-9" : "mt-2"} ${
        "bg-light-white"
      }`}
      activeclassname="active"
      onClick={HandleLogout} 
      >
        <div className="icon"><FaSignOutAlt/></div>
        <div className={`${!open && "hidden"} origin-left duration-200`}>
            Logout
        </div>
    </NavLink>
    );
  }
  
export default Logout;