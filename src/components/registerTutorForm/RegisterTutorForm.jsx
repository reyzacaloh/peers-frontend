import React from 'react';
import {Formik} from 'formik';
import axios from "axios";

const RegisterTutorForm = () => {
    
    return (
        <Formik
        initialValues={{
           
        }}
        onSubmit= {async (values,actions) => {
        console.log("Values: ", values);
        try {
            <div><h1>Registration Form</h1></div>
            const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/registerTutor",
            values
            );
            actions.setSubmitting(false);
            console.log(response);
        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.message)
            actions.setSubmitting(false);
        }
        }}>
        
        {formik => (
            <div> 
            <form style={{ display: "inline-block", margin: '0 40%', border: '1px solid black', padding: '10px'}} onSubmit={formik.handleSubmit}> 
            {formik.status && <div id="feedback">Error : {formik.status}</div>}
            <div><img alt="profile" class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"></img><br></br></div>
                <label  htmlFor="email" >Email Akademik :<br></br></label>
                <input 
                id="email"
                data-testid="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                /><br></br>
                <label htmlFor="name" >Nama sesuai KTP :<br></br></label>
                <input
                id="name"
                data-testid="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
                /> <br></br>
                <label htmlFor="npm" required>NIM/NPM :<br></br></label>
                <input
                id="npm"
                data-testid="npm"
                name="npm"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.npm}
                required
                /><br></br>
                <label htmlFor="identity" required>Kartu Identitas/KTP :<br></br></label>
                <input
                id="identity"
                data-testid="identity"
                name="identity"
                type="file"
                onChange={formik.handleChange}
                value={formik.values.identity}
                disabled
                /><br></br>
                <button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? (
                    "Loading..."
                ) : (
                    "Register"
                )}
                </button>
            </form>
            </div>)
            }
        </Formik>
    );
 };


 export default RegisterTutorForm;
