/* eslint-disable react-hooks/exhaustive-deps */
import {React, useEffect, useState, useMemo} from "react";
import "./FindTutor.css";
import SearchBar from "../components/SearchBar";
import TutorCard from "../components/tutor_card/TutorCard";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Empty, notification } from "antd";
const FindTutor = () => {

  const navigate = useNavigate();
  const [tutors, setTutor] = useState([]);
  const [currentSub, setSub] = useState("-");
  
  const fetchTutors = async () => {
    const sub = currentSub.replace(/\s+/g, "+")
    var link
    if (sub==='-'){
      link = `${process.env.REACT_APP_API_URL}/api/search_tutor/`
    } else {
      link = `${process.env.REACT_APP_API_URL}/api/search_tutor/?sub=${sub}`
    }
    try {
      const response = await axios.get(link, {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
        },
      });
      setTutor(response.data['tutors'])
    } catch (err) {
      console.log("Error: ", err.message);
      showError()
    }
  };
  const [api, contextHolder] = notification.useNotification();
    const showError = () => {
      api.error({
        message: 'Koneksi Gagal',
        description:
          'Mohon maaf jaringan kami sedang mengalami gangguan, silakan coba lagi nanti ',
        placement: 'top',
      });
  };
  useEffect(() => {
    fetchTutors();
  },[]);
  useMemo(() => {
    fetchTutors();
  },[currentSub]);
  return (
    <div className="page_container">
      {contextHolder}
      <div className="tutor__top_section" data-testid="search-bar">
        <h1 className="title">Cari Tutor</h1>
        <SearchBar onChange={(value)=>{
          setSub(value.value)
          }}/>
      </div>
      <div className="card_container">
        {tutors.length ? tutors.map((item, index) => (
          <TutorCard
          onClick={() => navigate(`/tutor/${item.uid['id']}`)}
            key={index}
            data={{
              firstname: `${item.uid['first_name']} ${item.uid['last_name']}`,
              university: item.university,
              profile_picture: item.uid['profile_picture'],
              descriptions: item.desc,
              price_per_hour: item.price_per_hour,
              review_count: item.review_count,
              rating: item.rating,
              subject: item.subject
            }}
          />
        )) : 
        <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{ height: 170 }}
        description={
          <span>
            Tidak ada Tutor yang memenuhi syarat
          </span>
        }
      >
      </Empty>}
      </div>
    </div>
  );
};

export default FindTutor;
