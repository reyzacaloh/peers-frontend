import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Form, Input, Label, Button, Error } from "./LoginFormStyle";
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {

    const navigate = useNavigate();

    const initialValues = {
        email: '',
        pass: ''
    }

    const onSubmit = async (values, actions) => {
        console.log("Values: ", values);

        try {
            let host = "https://peers-backend-dev.up.railway.app";
            await axios.post(
                `${host}/api/auth/token`,  // Django local port
                values
            );
            actions.setSubmitting(false);
            console.log("Success");
            actions.setStatus("success");
            navigate("/dashboard");
        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.message)
            actions.setSubmitting(false);
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid').min(11, "invalid email").required('Required'),
        pass: Yup.string().required('Required').min(5, 'Password minimal 5 karakter')
    })

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    });
    return (
        <div>
            <Form onSubmit={formik.handleSubmit}>
                <h1>Login Form</h1>
                <Label htmlFor="email"></Label>
                <Input type="email" id="email" name="email" placeholder="Email Address" data-testid="email" onChange={formik.handleChange} value={formik.values.email}/><br/>
                {formik.errors.email && formik.touched.email && (<Error className="error">{formik.errors.email}</Error>)}

                <Label htmlFor="pass"></Label>
                <Input type="password" id="pass" name="pass" placeholder="Password" data-testid="pass" onChange={formik.handleChange} value={formik.values.pass}/><br/>
                {formik.errors.pass && formik.touched.pass && (<Error className="error">{formik.errors.pass}</Error>)}

                <Button type="submit" disabled={formik.isSubmitting || formik.status==='success'}>
                    {formik.isSubmitting ? (
                        "Loading..."
                    ) : (
                        "Login"
                    )}
                </Button>
            </Form>
        </div>
    )
}

export default LoginForm