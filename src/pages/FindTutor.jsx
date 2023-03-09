import React from 'react';
import './FindTutor.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const FindTutor = () => {


    const tutorItem = [
        {
            id: 1,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            name: "Teacher 1",
            description: "This is product 1",
            price: "Rp100.000/jam",
            rating: 4.5,
        },
        {
            id: 2,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            name: "Teacher 2",
            description: "This is product 2",
            price: "Rp120.000/jam",
            rating: 3.5,
        },
        {
            id: 3,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            name: "Teacher 3",
            description: "This is product 3",
            price: "Rp90.000/jam",
            rating: 5.0,
        },
        {
            id: 4,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            name: "Teacher 4",
            description: "This is product 4",
            price: "Rp90.000/jam",
            rating: 5.0,
        },
        {
            id: 5,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            name: "Teacher 5",
            description: "This is product 5",
            price: "Rp90.000/jam",
            rating: 5.0,
        },
        {
            id: 6,
            image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample96.jpg",
            name: "Teacher 6",
            description: "This is product 6",
            price: "Rp90.000/jam",
            rating: 5.0,
        },
    ];


    return (
        <div>
            <h1 className="title">Cari Tutor</h1>
            <SearchBar/>
            <div className="grid-container">
                {tutorItem.map((item, index) => (
                    <NavLink to={"/chat/" + item.id} key={index}>
                        <figure className="card">
                            <img src={item.image} alt={item.name} />
                            <div className="reserve">
                                <i className="ion-chatbubbles"></i>
                                <span>Reservasi</span>
                            </div>
                            <figcaption>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <div className="price">
                                    {item.price}
                                </div>
                                <i className="ion-ios-star"></i>
                                <span> {item.rating}/5</span>
                            </figcaption>
                        </figure>
                    </NavLink>
                ))}
            </div>
        </div>

    );
};

export default FindTutor;