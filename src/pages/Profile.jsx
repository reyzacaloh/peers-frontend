import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import './Profile.css';
import axios from 'axios';
import LearnerSchedule from '../components/LearnerSchedule';
import { Link } from "react-router-dom";
import { MdEmail, MdDateRange } from "react-icons/md";

const Profile = () => {
  const [profile, setProfile] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/profile/`, {
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
    fetchData();
  }, []);

  return (
    <div className='page_container'>
      <h1>Profile page</h1>
      <div className="grid-container">
        <div className="card">
        <Card
            title={'Welcome, ' + profile.first_name}
            style={{
            width: 500,
            height: 1000,
          }}
          headStyle={{fontSize: 25, color:'white', backgroundColor: '#279686', border: '1.5px solid black' }}
          bodyStyle={{border: '1.5px solid black'}}
        >
          <div>
            <img className="profile-usr" src={profile.profile_picture} alt="profile"/>
          </div>
            <h1 className="card_h1">
              {profile.first_name} {profile.last_name}{' '}
            </h1>
            <br></br>
            <h4 className="card_h4"><MdEmail></MdEmail> &nbsp;&nbsp;{profile.email}</h4>
            <h4 className="card_h4"><MdDateRange></MdDateRange> &nbsp;&nbsp;{profile.date_of_birth}</h4>
        </Card>
        </div>
        <div className="content">
          <LearnerSchedule/>
          <Link to='/chat' className='cv-btn'>Chat</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
