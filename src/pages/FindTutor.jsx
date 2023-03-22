import React from 'react';
import './FindTutor.css';
import SearchBar from '../components/SearchBar';
import TutorCard from '../components/tutor_card/TutorCard';

const FindTutor = () => {

    const tutorItem = [
        {
            id: 1,
            profile_picture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            firstname: "Teacher 1",
            university: "University",
            descriptions: "This is product 1",
            price_per_hour: 100000,
            rating: 4.5,
            review_count: 10,
        },
        {
            id: 2,
            profile_picture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            firstname: "Teacher 2",
            university: "University",
            descriptions: "This is product 2",
            price_per_hour:  20000,
            rating: 3.5,
            review_count: 10,
        },
        {
            id: 3,
            profile_picture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            firstname: "Teacher 3",
            university: "University",
            descriptions: "This is product 3",
            price_per_hour: 90000,
            rating: 5.0,
            review_count: 10,
        },
        {
            id: 4,
            profile_picture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            firstname: "Teacher 4",
            university: "University",
            descriptions: "This is product 4",
            price_per_hour: 90000,
            rating: 5.0,
            review_count: 10,
        },
        {
            id: 5,
            profile_picture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            firstname: "Teacher 5",
            university: "University",
            descriptions: "This is product 5",
            price_per_hour: 90000,
            rating: 5.0,
            review_count: 10,
        },
        {
            id: 6,
            profile_picture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            firstname: "Teacher 6",
            university: "University",
            descriptions: "This is product 6",
            price_per_hour: 90000,
            rating: 5.0,
            review_count: 10,
        },
    ];

    return (
        <div>
            <h1 className="title">Cari Tutor</h1>
            <SearchBar/>
            <div className="grid-container">
                {tutorItem.map((item, index) => (
                    <TutorCard key={index} data={{
                        firstname: item.firstname,
                        university: item.university,
                        profile_picture: item.profile_picture,
                        descriptions: item.descriptions,
                        price_per_hour: item.price_per_hour,
                        review_count: item.review_count,
                        rating: item.rating,
                    }} />
                ))}
            </div>
        </div>

    );
};

export default FindTutor;