import React from 'react' 
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt} from 'react-icons/fa';
import { AuthContext } from '../../contexts/AuthContext';
import {
  SLink,
  SLinkContainer,
  SLinkIcon,
  SLinkLabel,
} from "../styles";

function Logout({ sidebarOpen }) {
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
          <SLinkIcon data-testid="logout">{<FaSignOutAlt></FaSignOutAlt>}</SLinkIcon>
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