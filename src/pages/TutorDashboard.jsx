import React from 'react';
import { FaWallet, FaUser, FaCalendar } from 'react-icons/fa';
import TutorBookingTable from '../components/TutorBookingTable';
import "./TutorDashboard.css"

const TutorDashboard = () => {
    return (
        <div>
            <h1>Tutor Dashboard page</h1>
            <div className="grid-container">
            <div className="card">
                    <div className="icon">
                        <FaCalendar className='ion-icon'/>
                    </div>
                    <div className="content">
                        <h4>Ubah Jadwal</h4>
                    </div>
                </div><div className="card">
                    <div className="icon">
                        <FaUser className='ion-icon'/>
                    </div>
                    <div className="content">
                        <h4>Edit Profil</h4>
                    </div>
                </div>
                <div className="card">
                    <div className="icon">
                        <FaWallet className='ion-icon'/>
                    </div>
                    <div className="content">
                        <h4>Rp480.000</h4>
                    </div>
                </div>
                
            </div>
            <div>
                    <TutorBookingTable/>
                </div>
        </div>
    );
};

export default TutorDashboard;