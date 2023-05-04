import {
  AcademicCapIcon,
  ArrowLeftCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./TutorDetail.css";
import { dateFormat, timeFormat } from "../../utils/common";

function TutorDetail() {
  const [profile, setProfile] = useState({ uid: {}, subject: "" });
  const [schedule, setSchedule] = useState([]);
  const { id } = useParams();

  

  const createBooking = async (tutor_id, schedule_id) => {
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/booking/book`, {
        tutor_id,
        schedule_id
      }, {
        headers: {
          authorization: `Bearer ${JSON.parse(
            localStorage.getItem("token")
          )}`,
        },
      })
      console.log(response)
      alert("Reservation has been sent...")
    } catch(e) {
      console.log(e)
    }
  }
  const fetchData = async (setProfile) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/search_tutor/?id=${id}`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response);
      setSchedule(
        response.data.schedules.sort(
          (a, b) =>
            Date.parse(new Date(a.date_time)) -
            Date.parse(new Date(b.date_time))
        )
      );
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
          <NavLink to={"/"}>
            <ArrowLeftCircleIcon color="white" />
          </NavLink>
        </div>
        <div className="details-tutor">
          <img
            src={`${process.env.REACT_APP_API_URL}${profile.uid.profile_picture}`}
            alt={profile.uid.first_name}
            className="profile-pic"
          />
          <h1 className="heading">
            {profile.uid.first_name} {profile.uid.last_name}
          </h1>
          <div className="stats">
            <div className="col-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <AcademicCapIcon />
              </svg>
              <p>{profile.subject}</p>
            </div>
            <div className="col-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <BuildingLibraryIcon />
              </svg>
              <p>{profile.university}</p>
            </div>
          </div>
        </div>
      </header>
      <div className="table-tutor-detail">
        <div>
          <h1>Jadwal Reservasi</h1>
          <div className="table-wrapper">
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Waktu</th>
                  <th>Status</th>
                  <th>Pesan</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map(({ date_time, is_booked, id }, key) => {
                  const className = `td ${
                    key === schedule.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={date_time}>
                      <td className={className}>
                        <div style={{ textAlign: "center" }}>
                          {dateFormat(date_time)}
                        </div>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <b>{timeFormat(date_time)}</b>
                      </td>
                      <td
                        className={className}
                        style={{
                          textAlign: "center",
                          color: !is_booked ? "green" : "red",
                        }}
                      >
                        {!is_booked ? "Available" : "Booked"}
                      </td>
                      {!is_booked ? (
                        <td
                          className={className}
                          style={{ textAlign: "center" }}
                        >
                          <div className={"reservasi-button"} onClick={() => createBooking(profile.uid.id, id)}>Reservasi</div>
                        </td>
                      ) : (
                        <div style={{ backgroundColor: "white" }}></div>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TutorDetail;
