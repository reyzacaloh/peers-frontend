import {
  BuildingLibraryIcon,
  AcademicCapIcon,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TutorDetail.css'

function TutorDetail() {

  const [profile, setProfile] = useState({ uid: {}, subject: "" });
  const [schedule, setSchedule] = useState([]);
  const { id } = useParams();

  function dateFormat(datetime) {
    let date = new Date(datetime);
    let day = date.getUTCDate();
    let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
  }

  function timeFormat(datetime) {
    let date = new Date(datetime);
    let hour = date.getUTCHours() < 10 ? `0${date.getUTCHours()}` : date.getUTCHours();
    let minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    
    return `${hour}:${minute}`;
  }

  const fetchData = async (setProfile) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search_tutor/?id=${id}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      console.log(response);
      setSchedule(response.data.schedules.reverse());
      setProfile(response.data.tutors[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(setProfile);
    //eslint-disable-next-line
  }, []);

  return (
    <section className="tutor-detail">
      <header className="header">
      <div className="back-button">
        <NavLink to={"/"}><ArrowLeftCircleIcon color="white"/></NavLink>
      </div>
        <div className="details">
          <img src={`${process.env.REACT_APP_API_URL}${profile.uid.profile_picture}`} alt="John Doe" className="profile-pic" />
          <h1 className="heading">{profile.uid.first_name} {profile.uid.last_name}</h1>
          <div className="stats">
            <div className="col-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <AcademicCapIcon />
            </svg> 
              <p>{profile.subject}</p>
            </div>
            <div className="col-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <BuildingLibraryIcon/>
            </svg>
            <p>{profile.university}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="table">
      <h1 className="title">Jadwal Mengajar</h1>
      <table>
        <thead>
          <tr>
            {["waktu", "status", "reservasi"].map((el) => (
              <th
                key={el}
                className="border-b border-blue-gray-50 py-3 px-5 text-center"
              >
                {el}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {schedule.map(
            ({ date_time, is_booked }, key) => {
              const className = `py-3 px-5 ${key === schedule.length - 1
                ? ""
                : "border-b border-blue-gray-50"
                }`;

              return (
                <tr key={date_time}>
                  <td className={className}>
                    <div className="items-center gap-4" style={{ textAlign: "center" }}>
                      <div>
                        <b>
                          {timeFormat(date_time)}
                        </b>
                        <br />
                        {dateFormat(date_time)}
                      </div>
                    </div>
                  </td>
                  <td className={className} style={{ textAlign: "center", color: !is_booked ? "green" : "red" }}>
                    {!is_booked ? "Available" : "Booked"}
                  </td>
                  {!is_booked ? <td className={className} style={{ textAlign: "center" }}>
                    <NavLink className={"reservasi-button"}>
                    Reservasi
                    </NavLink>
                  </td> : <div style={{backgroundColor:"white"}}></div>}
                </tr>
              );
            }
          )}
        </tbody>
      </table>

      </div>
    </section>
  );
}



export default TutorDetail;
