import React, { useState, useEffect } from "react";
import axios from "axios";
import "./VerifyTable.css"

const VerifyTable = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get('https://peers-backend-dev.up.railway.app/api/tutor_form/verify/');
    setUser(response.data['applicants']);
  };
  console.log(users)
  console.log(typeof users)

  const VerifyUser = async(pddikti,status)=>{
    try{
            const formData = new FormData();
            formData.append("pddikti", pddikti);
            formData.append("is_verified", true);
            formData.append("is_accepted", status);
            await axios.patch(
                "https://peers-backend-dev.up.railway.app/api/tutor_form/verify/",
                formData,
                {headers: {
                    "content-type": "multipart/form-data",
                }}
                );
            console.log('success');
    } catch(error){
      console.log("Error: ", error);
    }

  }

  return (
    <table>
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Email</th>
          <th scope="col">Transkrip Nilai</th>
          <th scope="col">KTM</th>
          <th scope="col">Selfie</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
          {users.map((user, index) => (
          <tr>
            <td data-label="No">{index + 1}</td>
            <td data-label="Email">{user.uid.email}</td>
            <td data-label="Transkrip Nilai"><a target={"_blank"} href={`${user.transkrip}`}>link</a></td>
            <td data-label="KTM"><a target={"_blank"} href={`${user.ktp}`}>link</a></td>
            <td data-label="Selfie"><a target={"_blank"} href={`${user.ktm_person}`}>link</a></td>
            
            <td data-label="Actions" classname="td-button">
              <button
                onClick={() => VerifyUser(user.pddikti,true)}
                className="success">
                accept
              </button>
              <button
                onClick={() => VerifyUser(user.pddikti,false)}
                className="danger">
                deny
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VerifyTable;