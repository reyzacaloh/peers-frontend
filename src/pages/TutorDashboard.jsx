import { FaWallet, FaUser, FaCalendar } from 'react-icons/fa';
import "./TutorDashboard.css"
import "./../components/TutorBookingTable.css"
import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, Tabs} from 'antd';
import {addHours, subSeconds} from 'date-fns';
import { currencyFormat, getTutorIncome } from '../utils/common';

function TutorDashboard() {

    const [tutorIncome, setTutorIncome] = useState({});
    const [upcoming, addUpcoming] = useState([]);
    const [ongoing, addOngoing] = useState([]);
    const [history, addHistory] = useState([]);

    const processSchedule = (schedule) => {
        const current_time = new Date()
        const schedule_time = new Date(schedule.date_time)
        const transformed_schedule = {
            key: schedule['id'],
            learner: schedule['learner_id'] ?? 'Belum ada',
            date: `${schedule_time.getFullYear()}-${schedule_time.getMonth() + 1}-${schedule_time.getDate()}`,
            time: schedule_time.toLocaleTimeString()
        }
        if (current_time < schedule_time) {
            addUpcoming(current => current.find(e => e.key === transformed_schedule.key) ? [...current] : [transformed_schedule, ...current])
        } else if (schedule_time >= subSeconds(current_time, 1) && schedule_time <= addHours(current_time, 1)) {
            addOngoing(current => current.find(e => e.key === transformed_schedule.key) ? [...current] : [transformed_schedule, ...current])
        } else {
            transformed_schedule.learner = schedule['learner_id'] ?? '-'
            addHistory(current => current.find(e => e.key === transformed_schedule.key) ? [...current] : [transformed_schedule, ...current])
        }

        return schedule
    }

    const columns = [
        {
            title: 'Learner',
            dataIndex: 'learner',
            key: 'learner',
        },
        {
            title: 'Tanggal',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Waktu',
            dataIndex: 'time',
            key: 'time',
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
            children: <Table columns={columns} dataSource={history} />,
        },
    ];


    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule?tutor=1`, {
                headers: {
                    authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
            });
            console.log(response);
            response.data['schedules'].map(processSchedule)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
        setTutorIncome(getTutorIncome());
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
                <NavLink to={"/tutor/edit-price"}>
                    <div className="card-tutor-dashboard">
                        <div className="icon">
                            <FaWallet className='ion-icon' />
                        </div>
                        <div className="content">
                            <h4>{currencyFormat(tutorIncome['total_income'] || 0)}</h4>
                        </div>
                    </div>
                </NavLink>
            </div>
            <div className="table-tutor-detail">
                <div>
                    <h1>Jadwal Mengajarmu</h1>
                    <div className="table-wrapper">
                    <Tabs defaultActiveKey="1" centered items={items}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TutorDashboard;