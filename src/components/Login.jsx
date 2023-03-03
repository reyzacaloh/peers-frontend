import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Login = () => {

    const initialValues = {
        email: '',
        pass: ''
    }

    const onSubmit = values => {
        console.log("Submit", values);

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
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="email">E-mail: </label><br/>
                <input type="email" id="email" name="email" onChange={formik.handleChange} value={formik.values.email}/><br/>
                {formik.errors.email ? <div>{formik.errors.email}</div> : null}

                <label htmlFor="pass">Password: </label><br/>
                <input type="password" id="pass" name="pass" onChange={formik.handleChange} value={formik.values.pass}/><br/>
                {formik.errors.pass ? <div>{formik.errors.pass}</div> : null}

                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login