import { useState } from 'react';
import axios from 'axios';
import { Space, Table, Tag , Tabs} from 'antd';
import {addHours} from 'date-fns';
import { userRequest } from '../axiosInstance';

const LearnerSchedule = () => {
  const [upcoming, addUpcoming] = useState([]);
  const [ongoing, addOngoing] = useState([]);
  const [history, addHistory] = useState([]);
 
  const processSchedule = (schedule) => {
    const current_time = new Date()
    const schedule_time = new Date(schedule.date_time)
    if (schedule_time<current_time) {
        addUpcoming(current => [...current, schedule])
    } else if (schedule_time >= current_time && schedule_time <= addHours(current_time, 1)){
        addOngoing(current => [...current, schedule])
    } else {    
        addHistory(current => [...current, schedule])
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
  const upcomingData= [
    {
      tutor: 'John@gmail.com',
      date: '2023-04-21',
      time: '09.00'
    },
    {
        tutor: 'Nick@gmail.com',
        date: '2023-04-22',
        time: '10.00'
    },
  ];
  const ongoingData= [
    {
      tutor: 'Wick@gmail.com',
      date: '2023-04-14',
      time: '13.00'
    }
  ];
  const historyData= [
    {
      tutor: 'Brad@gmail.com',
      date: '2023-04-11',
      time: '12.00'
    }
  ];
  const items = [
    {
      key: '1',
      label: `Upcoming`,
      children: <Table columns={columns} dataSource={upcomingData} />,
    },
    {
      key: '2',
      label: `Ongoing`,
      children: <Table columns={columns} dataSource={ongoingData} />,
    },
    {
      key: '3',
      label: `History`,
      children: <Table columns={columns} dataSource={historyData} />,
    },
  ];
  const fetchSchedule = async () => {
    try {
      const response = await userRequest.get('api/schedule/', {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      response.data['schedules'].map(processSchedule)
    } catch (error) {
      console.log(error);
    }
  };
  return <Tabs defaultActiveKey="1" centered items={items}/>;

}

export default LearnerSchedule;
