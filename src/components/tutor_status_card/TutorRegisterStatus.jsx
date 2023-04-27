import React, { useContext } from "react";
import "./TutorRegisterStatus.css";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
const TutorRegisterStatus = ({ is_accepted, is_verified }) => {
  const pending = !is_accepted && !is_verified;
  const {state, setTutor} = useContext(AuthContext);
  const handleRegistrasi = async () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/tutor_form/tutor/data`, {
      headers: {
        "authorization": `Bearer ${state.token}`
      }
    })
    setTutor({});
  }
  return (
    <div className="status_container" data-testid="tutorRegisterStatus">
      <div className="main_status">
        <div className="status_wrapper">
          {pending ? (
            <AccessTimeOutlinedIcon sx={{ fontSize: "40px", color: "gray" }} />
          ) : (
            <CancelOutlinedIcon sx={{ fontSize: "40px", color: "red" }} />
          )}
          <p className='statusText'>
            {pending
              ? "Masih menunggu verifikasi"
              : "Mohon Maaf Registrasi anda ditolak!"}
          </p>
        </div>
        {pending ? (
          <></>
        ) : (
          <>
            <div className="btn" onClick={handleRegistrasi}>Ajukan Kembali</div>
          </>
        )}
      </div>
    </div>
  );
};

export default TutorRegisterStatus;
