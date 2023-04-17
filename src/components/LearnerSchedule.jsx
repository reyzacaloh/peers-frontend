/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {Table, Tabs} from 'antd';
import {addHours} from 'date-fns';
import axios from 'axios';

const LearnerSchedule = () => {
  const [upcoming, addUpcoming] = useState([]);
  const [ongoing, addOngoing] = useState([]);
  const [history, addHistory] = useState([]);
 
  const processSchedule = (schedule) => {
    const current_time = new Date()
    const schedule_time = new Date(schedule.date_time)
    const transformed_schedule = {
      key : `${schedule['id']}`,
      tutor : `${schedule['tutor_id']['uid']['first_name']} ${schedule['tutor_id']['uid']['last_name']}`,
      date : `${schedule_time.getFullYear()}-${schedule_time.getMonth()+1}-${schedule_time.getDate()}`,
      time : schedule_time.toLocaleTimeString()
    }
    if (current_time<schedule_time) {
        addUpcoming(current => current.find(e => e.key === transformed_schedule.key)?[...current]:[transformed_schedule,...current])
    } else if (schedule_time >= current_time && schedule_time <= addHours(current_time, 1)){
        addOngoing(current => current.find(e => e.key === transformed_schedule.key)?[...current]:[transformed_schedule,...current])
    } else {    
        addHistory(current => current.find(e => e.key === transformed_schedule.key)?[...current]:[transformed_schedule,...current])
    }
    
    return schedule
  }

  const columns = [
    {
      title: 'Tutor',
      dataIndex: 'tutor',
      key: 'tutor',
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
  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/?tutor=0`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      response.data['schedules'].map(processSchedule)
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };
  useEffect(() => {
    fetchSchedule();
  },[]);
  
  return <Tabs defaultActiveKey="1" centered items={items}/>;

}

export default LearnerSchedule;
