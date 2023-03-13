import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Header() {
    return (
        <div id='main'>
         <Navbar/>
         <div className="name">
            <h1>Peers</h1>
            <br/>
            <h2 className="details">
            Platform bimbingan belajar yang efektif bagi siswa/mahasiswa dalam mempelajari ilmu pengetahuan se-Indonesia
            </h2>
            <Link to='/login' className='cv-btn'>Coba Sekarang!</Link>
         </div>
        </div>
    );
    }

export default Header;