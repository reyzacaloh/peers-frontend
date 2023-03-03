import React from 'react';

const Profile = () => {
    return (
        <div>
            <h1>Profile page</h1>
            <div class="row">
                <div class="col-md-3 border-right">
                    <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img alt="profile" class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><br></br>
                        <span class="font-weight-bold">someone</span><br></br>
                        <span class="text-black-50">something@mail.com</span><span> </span>
                    </div>    
                </div>
                <br></br>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><br></br><input type="text" class="form-control" placeholder="first name" value=""></input></div>
                    <div class="col-md-6"><label class="labels">Surname</label><br></br><input type="text" class="form-control" value="" placeholder="surname"></input></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Mobile Number</label><br></br><input type="text" class="form-control" placeholder="enter phone number" value=""></input></div>
                    <div class="col-md-12"><label class="labels">Address</label><br></br><input type="text" class="form-control" placeholder="enter address line 1" value=""></input></div>
                    <div class="col-md-12"><label class="labels">Education</label><br></br><input type="text" class="form-control" placeholder="education" value=""></input></div>
                </div>
            </div>
        </div>
    );
};

export default Profile;