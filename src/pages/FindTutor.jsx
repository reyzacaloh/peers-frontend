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
            profile_picture: "https://asset.kompas.com/crops/Xib4wj6t22w90_fmizA-eVjubLc=/28x1372:3436x3644/750x500/data/photo/2019/07/23/5d36da33734ec.jpg",
            firstname: "Teacher 4",
            university: "University",
            descriptions: "This is product 4",
            price_per_hour: 90000,
            rating: 5.0,
            review_count: 10,
        },
        {
            id: 5,
            profile_picture: "https://awsimages.detik.net.id/community/media/visual/2020/02/14/2e749978-009c-4518-a57e-4aa694b9acf2_43.jpeg?w=700&q=90",
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
        {
            id: 6,
            profile_picture: "data:image/jpeg;base64,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",
            firstname: "Teacher 6",
            university: "University",
            descriptions: "This is product 6 This is product 6 This is product 6 This is product 6 This is product 6 This is product 6 This is productv 6 This is product 6 This is product 6 This is product 6 This is product 6 This is product 6 This is product 6 This is product 6 This is product 6 This is product 6v",
            price_per_hour: 90000,
            rating: 5.0,
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
            id: 3,
            profile_picture: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            firstname: "Teacher 3",
            university: "University",
            descriptions: "",
            price_per_hour: 90000,
            rating: 5.0,
            review_count: 10,
        },
    ];

    return (
        <div className='page'>
           <div className="tutor__top_section">
           <h1 className="title">Cari Tutor</h1>
            <SearchBar/>
           </div>
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