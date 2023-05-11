import { FaWallet, FaUser, FaCalendar } from 'react-icons/fa';
import "./TutorDashboard.css"
import "./../components/TutorBookingTable.css"
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { currencyFormat, getTutorIncome } from '../utils/common';

function TutorDashboard() {

    const [schedule, setSchedule] = useState([]);
    const [tutorIncome, setTutorIncome] = useState({});

    function dateFormat(datetime) {
        let date = new Date(datetime);
        let day = date.getUTCDate();
        let month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    function timeFormat(datetime) {
        let date = new Date(datetime);
        return date.toLocaleTimeString();
    }

    const fetchData = async (setSchedule) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule?tutor=1`, {
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
            });
            console.log(response);
            setSchedule(response.data.schedules.sort((a, b) => Date.parse(new Date(a.date_time)) - Date.parse(new Date(b.date_time))));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData(setSchedule);
        setTutorIncome( getTutorIncome());
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="grid-container-tutor">
                <NavLink to={"/tutor/add-schedule"}>
                    <div className="card-tutor-dashboard">
                        <div className="icon">
                            <FaCalendar className='ion-icon' />
                        </div>
                        <div className="content">
                            <h4>Tambah Jadwal</h4>
                        </div>
                    </div>
                </NavLink>
                <NavLink to={"/profile"}>
                    <div className="card-tutor-dashboard">
                        <div className="icon">
                            <FaUser className='ion-icon' />
                        </div>
                        <div className="content">
                            <h4>Edit Profil</h4>
                        </div>
                    </div>
                </NavLink>
                <div className="card-tutor-dashboard">
                    <div className="icon">
                        <FaWallet className='ion-icon' />
                    </div>
                    <div className="content">
                        <h4>{currencyFormat(tutorIncome['total_income'] || 0)}</h4>
                    </div>
                </div>
            </div>
            <div className="table-tutor-detail">
                <div>
                    <h1>Jadwal Mengajarmu</h1>
                    <div className="table-wrapper">
                        <table className="fl-table">
                            <thead>
                                <tr>
                                    <th>Tanggal</th>
                                    <th>Waktu</th>
                                    <th>Status</th>
                                    <th>Learner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map(
                                    ({ date_time, is_booked, learner_id }, key) => {
                                        const className = `${key === schedule.length - 1
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
                                                    <b>
                                                        {timeFormat(date_time)}
                                                    </b>
                                                </td>
                                                <td className={className} style={{ textAlign: "center", color: !is_booked ? "green" : "red" }}>
                                                    {!is_booked ? "Available" : "Booked"}
                                                </td>
                                                {is_booked ? <td className={className} style={{ textAlign: "center" }}>

                                                    {learner_id}
                                                </td> : <td style={{ textAlign: "center" }}>-</td>}
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorDashboard;