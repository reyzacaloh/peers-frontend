import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterTutorForm from "../components/registerTutorForm/RegisterTutorForm";
import TutorRegisterStatus from "../components/tutor_status_card/TutorRegisterStatus";
import { AuthContext } from "../contexts/AuthContext";
import "./RegisterTutor.css";
const RegisterTutor = () => {
  const { state, getTutor, tutor} = useContext(AuthContext);
  
  const navigate = useNavigate();

  useEffect(() => {
   
    if (tutor.is_accepted) {
      navigate("/tutor/dashboard");
    }
   getTutor(JSON.parse(state.token))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tutor.is_submitted]);
  return (
    <div className="page_container">
      <div className="register_tutor_wrapper">
        {tutor.is_submitted && !tutor.is_accepted ? (
          <TutorRegisterStatus
            is_accepted={tutor.is_accepted}
            is_verified={tutor.is_verified}
          />
        ) : (
          <RegisterTutorForm />
        )}
      </div>
    </div>
  );
};

export default RegisterTutor;
