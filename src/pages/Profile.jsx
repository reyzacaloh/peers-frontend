import React from 'react';

const Profile = () => {
    return (
        <div>
            <h1>Profile page</h1>
            <div className="row">
                <div className="col-md-3 border-right">
                    <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img alt="profile" className="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><br></br>
                        <span className="font-weight-bold">someone</span><br></br>
                        <span className="text-black-50">something@mail.com</span><span> </span>
                    </div>    
                </div>
                <br></br>
                <div className="row mt-2">
                    <div className="col-md-6"><label className="labels">Name</label><br></br><input type="text" className="form-control" placeholder="first name" value=""></input></div>
                    <div className="col-md-6"><label className="labels">Surname</label><br></br><input type="text" className="form-control" value="" placeholder="surname"></input></div>
                </div>
                <div className="row mt-3">
                    <div className="col-md-12"><label className="labels">Mobile Number</label><br></br><input type="text" className="form-control" placeholder="enter phone number" value=""></input></div>
                    <div className="col-md-12"><label className="labels">Address</label><br></br><input type="text" className="form-control" placeholder="enter address line 1" value=""></input></div>
                    <div className="col-md-12"><label className="labels">Education</label><br></br><input type="text" className="form-control" placeholder="education" value=""></input></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;