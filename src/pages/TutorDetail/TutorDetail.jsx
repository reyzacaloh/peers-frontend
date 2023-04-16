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
  const { id } = useParams();

  const fetchData = async (setProfile) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/search_tutor/?id=${id}`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      console.log(response);
      setProfile(response.data.tutors[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(setProfile);
    //eslint-disable-next-line
  }, []);

  const authorsTableData = [
    {
      date: "Kamis, 6 April 2023",
      time: "16:00",
      status: true,
    },
    {
      date: "Kamis, 6 April 2023",
      time: "17:00",
      status: false,
    },
    {
      date: "Kamis, 6 April 2023",
      time: "18:00",
      status: true,
    },
    {
      date: "Kamis, 6 April 2023",
      time: "19:00",
      status: true,
    },
    {
      date: "Jumat, 7 April 2023",
      time: "16:00",
      status: false,
    },
    {
      date: "Jumat, 7 April 2023",
      time: "17:00",
      status: false,
    },
  ];


  return (
    <section className="profile">
      <header className="header">
      <div className="back-button">
        <NavLink to={"/"}><ArrowLeftCircleIcon color="white"/></NavLink>
      </div>
        <div className="details">
          <img src={profile.uid.profile_picture} alt="John Doe" className="profile-pic" />
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
          {authorsTableData.map(
            ({ date, time, status }, key) => {
              const className = `py-3 px-5 ${key === authorsTableData.length - 1
                ? ""
                : "border-b border-blue-gray-50"
                }`;

              return (
                <tr key={date + time}>
                  <td className={className}>
                    <div className="items-center gap-4" style={{ textAlign: "center" }}>
                      <div>
                        <b>
                          {time}
                        </b>
                        <br />
                        {date}
                      </div>
                    </div>
                  </td>
                  <td className={className} style={{ textAlign: "center", color: status ? "green" : "red" }}>
                    {status ? "Available" : "Booked"}
                  </td>
                  {status ? <td className={className} style={{ textAlign: "center" }}>
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
