import React from 'react';
import "./Dashboard.css";
import Header from '../components/Header';
import Feature from '../components/Feature';
import { Divider } from '@mui/material';

const Dashboard = () => {
    return (
        <div>
            <Header/>
            <Feature/>
                <Divider/>
            <footer>
                <p>© 2023 Peers. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Dashboard;