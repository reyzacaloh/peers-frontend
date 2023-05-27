/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import {Table, Tabs} from 'antd';
import axios from 'axios';
import Rating from './Rating';

const RatingSchedule = () => {
  
  const [history, addHistory] = useState([]);
 
  const processSchedule = (schedule) => {
    const current_time = new Date()
    const schedule_time = new Date(schedule.date_time)
    const transformed_schedule = {
      key : `${schedule['id']}`,
      tutor : `${schedule['tutor_id']['uid']['first_name']} ${schedule['tutor_id']['uid']['last_name']}`,
      date : `${schedule_time.getFullYear()}-${schedule_time.getMonth()+1}-${schedule_time.getDate()}`,
      time : schedule_time.toLocaleTimeString(),
      rating : <Rating isRated={`${schedule['is_finished']}`} tutorId={`${schedule['tutor_id']['id']}`} scheduleId={`${schedule['id']}`}></Rating>,
    }
    if (current_time>schedule_time) {
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
    },
    {
        title: 'Rate',
        dataIndex: 'rating',
        key: 'rating',
    }
  ];
  const items = [{
      key: '1',
      label: `Rate your previous Tutoring Sessions :`,
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
      console.log(response);
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };
  useEffect(() => {
    fetchSchedule();
  },[]);
  
  return <Tabs defaultActiveKey="1" centered items={items}/>;

}

export default RatingSchedule;
