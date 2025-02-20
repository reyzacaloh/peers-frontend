/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Table, Tabs } from 'antd';
import { addHours, subSeconds } from 'date-fns';
import axios from 'axios';

const LearnerSchedule = () => {
  const [upcoming, setUpcoming] = useState([]);
  const [ongoing, setOngoing] = useState([]);
  const [history, setHistory] = useState([]);

  const fetchSchedule = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/schedule/?tutor=0`, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });

      const upcomingSet = new Set();
      const ongoingSet = new Set();
      const historySet = new Set();

      const upcomingList = [];
      const ongoingList = [];
      const historyList = [];

      response.data['schedules'].forEach((schedule) => {
        const current_time = new Date();
        const schedule_time = new Date(schedule.date_time);
        const transformed_schedule = {
          key: `${schedule.id}`,
          tutor: `${schedule.tutor_id.uid.first_name} ${schedule.tutor_id.uid.last_name}`,
          date: `${schedule_time.getFullYear()}-${schedule_time.getMonth() + 1}-${schedule_time.getDate()}`,
          time: schedule_time.toLocaleTimeString(),
        };

        if (current_time < schedule_time && !upcomingSet.has(transformed_schedule.key)) {
          upcomingSet.add(transformed_schedule.key);
          upcomingList.push(transformed_schedule);
        } else if (current_time >= subSeconds(schedule_time, 1) && current_time <= addHours(schedule_time, 1) && !ongoingSet.has(transformed_schedule.key)) {
          ongoingSet.add(transformed_schedule.key);
          ongoingList.push(transformed_schedule);
        } else if (!historySet.has(transformed_schedule.key)) {
          historySet.add(transformed_schedule.key);
          historyList.push(transformed_schedule);
        }
      });

      setUpcoming(upcomingList);
      setOngoing(ongoingList);
      setHistory(historyList);

    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

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

  return <Tabs defaultActiveKey="1" centered items={items} />;
};

export default LearnerSchedule;
