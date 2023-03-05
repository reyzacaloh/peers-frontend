import React from 'react';
import { Formik} from 'formik';
import axios from "axios";

const RegisterForm = () => {
    return (
        <div id='regis-form'>
        <h1>Register Form</h1>
        <Formik
        initialValues={{}}
        onSubmit= {async (values,actions) => {
        try {
            const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/register",
            values
            );
            console.log(response);
            actions.setStatus('success');
        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.message)
        }
        }}>
        {formik => (
            <form onSubmit={formik.handleSubmit} data-testid="form">
                <label htmlFor="email" ></label>
                <input
                id="email"
                data-testid="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder = 'Email Address'
                /><br></br>
                <label htmlFor="password" ></label>
                <input
                id="password"
                data-testid="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder='Password'
                /> <br></br>
                <label htmlFor="first_name" required></label>
                <input
                id="first_name"
                data-testid="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                placeholder='First Name'
                /><br></br>
                <label htmlFor="last_name" required></label>
                <input
                id="last_name"
                data-testid="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                placeholder='Last Name'
                /><br></br>
                <label htmlFor="date_of_birth" required>Date of Birth</label>
                <input
                id="date_of_birth"
                data-testid="date_of_birth"
                name="date_of_birth"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date_of_birth}
                /><br></br>
                <label htmlFor="profile_picture" required>Profile Picture :<br></br></label>
                <input
                id="profile_picture"
                data-testid="profile_picture"
                name="profile_picture"
                type="file"
                onChange={formik.handleChange}
                value={formik.values.profile_picture}
                disabled
                /><br></br>
                <button type="submit" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? (
                    "Loading..."
                ) : (
                    "Register"
                )}
                </button>
            </form>)
            }
        </Formik>
        </div>
    );
 };


 export default RegisterForm;