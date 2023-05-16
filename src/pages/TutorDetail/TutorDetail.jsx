import {
  AcademicCapIcon,
  ArrowLeftCircleIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./TutorDetail.css";
import { showErrorToast, showSuccessToast } from "../../utils/common";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import {
  Rating,
  Star,
  Rate,
  Review,
} from "../../components/tutor_card/tutorStyledComponents";
import { Table, Tabs } from 'antd';
import { addHours, subSeconds } from 'date-fns';

function TutorDetail() {
  const [profile, setProfile] = useState({ uid: {}, subject: "" });
  const { id } = useParams();

  const [upcoming, addUpcoming] = useState([]);
  const [ongoing, addOngoing] = useState([]);
  const [history, addHistory] = useState([]);

  const processSchedule = (schedule) => {
    const current_time = new Date()
    const schedule_time = new Date(schedule.date_time)
    const transformed_schedule = {
      key: `${schedule['id']}`,
      date: `${schedule_time.getFullYear()}-${schedule_time.getMonth() + 1}-${schedule_time.getDate()}`,
      time: schedule_time.toLocaleTimeString(),
      book: schedule['is_booked']
    }
    if (current_time < schedule_time) {
      addUpcoming(current => current.find(e => e.key === transformed_schedule.key) ? [...current] : [transformed_schedule, ...current])
    } else if (schedule_time >= subSeconds(current_time, 1) && schedule_time <= addHours(current_time, 1)) {
      addOngoing(current => current.find(e => e.key === transformed_schedule.key) ? [...current] : [transformed_schedule, ...current])
    } else {
      transformed_schedule.book = 
      addHistory(current => current.find(e => e.key === transformed_schedule.key) ? [...current] : [transformed_schedule, ...current])
    }

    return schedule
  }

  const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Waktu',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Book',
      dataIndex: 'book',
      key: 'book',
      render: (text, record) => (
        !record.book ? (
          <div
            style={{ textAlign: "center" }}
          >
            <div className={"reservasi-button"} onClick={() => createBooking(profile.uid.id, record.key)}>Reservasi</div>
            <ToastContainer style={{ width: 'fit-content', margin: 'auto' }} toastClassName={"toast-style"} />
          </div>
        ) : (
          <div style={{ backgroundColor: "white" }}></div>
        )
      )
    }
  ];
  const items = [
    {
      key: '1',
      label: `Upcoming`,
      children: <Table columns={columns} dataSource={upcoming} />,
    },
    {
      key: '2',
      label: `Ongoing`,
      children: <Table columns={columns} dataSource={ongoing} />,
    },
    {
      key: '3',
      label: `History`,
      children: <Table columns={columns} dataSource={history}  />,
    },
  ];



  const createBooking = async (tutor_id, schedule_id) => {
    try {
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
      showSuccessToast("Reservation has been sent! Please kindly check payment menu!");
    } catch (e) {
      console.log(e)
      showErrorToast();
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
      response.data['schedules'].map(processSchedule)
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
      <header className="header-tutor-detail">
        <div className="back-button">
          <NavLink to={"/"}>
            <ArrowLeftCircleIcon color="white" />
          </NavLink>
        </div>
        <div className="details-tutor">
          <img
            src={profile.uid.profile_picture}
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
          <Rating style={{ paddingTop: "20px" }}>
            <Rate>
              <Star />
              <p style={{ fontWeight: "bold" }}>{profile.rating}</p>
            </Rate>
            <Review>({profile.review_count} ulasan)</Review>
          </Rating>
        </div>
      </header>
      <div className="table-tutor-detail">
        <div>
          <div className="descriptions-tutor">
            {profile.desc || "Tidak ada Deskripsi"}
          </div>
          <h1>Jadwal Reservasi</h1>
          <div className="table-wrapper">
            <Tabs defaultActiveKey="1" centered items={items} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TutorDetail;
