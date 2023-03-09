import React from 'react';
function Logout() {

    const handleLogout = () => {
      localStorage.removeItem("jwtToken");
    };
  
    return (
      <button onClick={handleLogout}>Logout</button>
    );
  }
  
  export default Logout;