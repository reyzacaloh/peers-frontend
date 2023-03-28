import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from 'axios';

function Profile() {
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
    <div>
      <h1>Profile page</h1>
      <div className="grid-container">
        <div className="card">
          <div>
            <img class="rounded" src="https://www.citypng.com/public/uploads/preview/png-profile-user-round-gray-icon-symbol-11639594342slkdqxcgi6.png" alt="profile" width="200" />
          </div>
          <div class="content">
            <h4>
              Nama: {profile.first_name} {profile.last_name}{' '}
            </h4>
            <h4>Email: {profile.email}</h4>
            <h4>Tanggal: {profile.date_of_birth}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
