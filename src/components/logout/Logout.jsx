import React, { useState } from 'react' 
import { useNavigate, NavLink } from 'react-router-dom';
import { FaSignOutAlt} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
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
} from "../styles";

function Logout() {
    const { dispatch } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [sidebarOpen] = useState(false);
    const HandleLogout = () => {

      dispatch({ type: "LOGOUT" });
      navigate("/");

    };

    return (
      <SLinkContainer onClick={HandleLogout} key="Logout">
        <SLink style={!sidebarOpen ? { width: `fit-content` } : {}} >
          <SLinkIcon>{<FaSignOutAlt></FaSignOutAlt>}</SLinkIcon>
          {sidebarOpen && (
            <>
              <SLinkLabel>Logout</SLinkLabel>
            </>
          )}
        </SLink>
      </SLinkContainer>
    );
  }
  
export default Logout;