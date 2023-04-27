import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';
import LearnerSchedule from '../components/LearnerSchedule';
import { MdEmail, MdDateRange } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState([]);

  const fetchData = async (setProfile) => {
    try {
      const response = await axios.get('https://peers-backend-dev.up.railway.app/api/auth/user/profile/', {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      setProfile(response.data.user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(setProfile);
  }, []);

  return (
    <div className='page_container'>
      <h1>Profile page</h1>
      <div className="grid-container">
        <div className="card">
          <div>
            <img className="rounded" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile"/>
          </div>
          <div className="content">
            <h1>
              Nama{profile.first_name} {profile.last_name}{' '}
            </h1>
            <br></br>
            <h4><MdEmail></MdEmail> &nbsp;&nbsp;someone@email.com{profile.email}</h4>
            <h4><MdDateRange></MdDateRange> &nbsp;&nbsp;10-10-2010{profile.date_of_birth}</h4>
          </div>
        </div>
        <div className="content">
          <LearnerSchedule></LearnerSchedule> 
        </div>
      </div>
    </div>
  );
}

export default Profile;
