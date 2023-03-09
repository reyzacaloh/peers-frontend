import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LoginForm = () => {

    const initialValues = {
        email: '',
        pass: ''
    }

    const onSubmit = async (values, actions) => {
        console.log("Values: ", values);

        try {
            const response = await axios.post(
                "http://localhost:8000"+"/api/auth/token",  // Django local port
                values
            );
            actions.setSubmitting(false);
            console.log("Response: ", response);
        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.message)
            actions.setSubmitting(false);
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid').required('Required'),
        pass: Yup.string().required('Required')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email"></label>
                <input type="email" id="email" name="email" placeholder="Email address" data-testid="email" onChange={formik.handleChange} value={formik.values.email}/><br/>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                <label htmlFor="pass"></label>
                <input type="password" id="pass" name="pass" placeholder="Password" data-testid="pass" onChange={formik.handleChange} value={formik.values.pass}/><br/>
                {formik.errors.pass ? <div>{formik.errors.pass}</div> : null}

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm