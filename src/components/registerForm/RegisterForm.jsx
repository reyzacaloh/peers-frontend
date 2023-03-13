import React from 'react';
import { Formik} from 'formik';
import axios from "axios";
import * as Yup from "yup";
import {
    Form,
    Input,
    Label,
    Button,
    Error
} from "./RegisterStyledComponents"
const RegisterForm = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid').min(11, "invalid email").required('Required'),
        password: Yup.string().required('Required').min(5, 'Password minimal 5 karakter'),
        date_of_birth: Yup.date().required('Required').max('2010-1-1','Minimal 10 tahun untuk registrasi'),
        first_name: Yup.string().required('Required').min(2, 'Minimal 2 karakter'),
        last_name: Yup.string().required('Required').min(2, 'Minimal 2 karakter'),
    })
    return (
        <div id='regis-form'>
        <Formik
        initialValues={{

        }}
        enableReinitialize={true}
        validationSchema = {validationSchema}
        onSubmit= {async (values,actions) => {
        try {
            const formData = new FormData();
            formData.append("email", values.email);
            formData.append("password", values.password);
            formData.append("first_name", values.first_name);
            formData.append("last_name", values.last_name);
            formData.append("date_of_birth", values.date_of_birth);
            formData.append("profile_picture", selectedFile);
            await axios.post(
                "http://peers-backend-dev.up.railway.app/api/auth/register/",
                formData,
                {headers: {
                    "content-type": "multipart/form-data",
                }}
                );
            console.log('success');
            actions.setStatus('success');
        } catch (err) {
            console.log("Error: ", err.message);
            actions.setStatus(err.message);
        }
        }}>
        {formik => (
            <Form onSubmit={formik.handleSubmit} data-testid="form">
                <h1>Register Form</h1>
                <Label htmlFor="email" ></Label>
                <Input
                id="email"
                data-testid="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder = 'Email Address'
                required
                /><br></br>
                {formik.errors.email && formik.touched.email && (<Error className="error">{formik.errors.email}</Error>)}
                <Label htmlFor="password" ></Label>
                <Input
                id="password"
                data-testid="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder='Password'
                required
                /><br></br>
                {formik.errors.password && formik.touched.password && (<Error className="error">{formik.errors.password}</Error>)}
                <Label htmlFor="first_name" required></Label>
                <Input
                id="first_name"
                data-testid="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                placeholder='First Name'
                required
                /><br></br>
                {formik.errors.first_name && formik.touched.first_name && (<Error className="error">{formik.errors.first_name}</Error>)}
                <Label htmlFor="last_name" required></Label>
                <Input
                id="last_name"
                data-testid="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                placeholder='Last Name'
                required
                /><br></br>
                {formik.errors.last_name && formik.touched.last_name && (<Error className="error">{formik.errors.last_name}</Error>)}
                <Label htmlFor="date_of_birth" required>Date of Birth</Label>
                <Input
                id="date_of_birth"
                data-testid="date_of_birth"
                name="date_of_birth"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date_of_birth}
                required
                /><br></br>
                {formik.errors.date_of_birth && formik.touched.date_of_birth && (<Error className="error">{formik.errors.date_of_birth}</Error>)}
                <Label htmlFor="profile_picture" required>Profile Picture :<br></br></Label>
                <Input
                id="profile_picture"
                data-testid="profile_picture"
                name="profile_picture"
                type="file"
                onChange={(event) => {
                    setSelectedFile(event.currentTarget.files[0]);
                  }}
                value={formik.values.profile_picture}
                accept=".jpg,.jpeg"
                required
                /><br></br>
                <Button type="submit" disabled={formik.isSubmitting || formik.status==='success'}>
                {formik.isSubmitting ? (
                    "Loading..."
                ) : (
                    "Register"
                )}
                </Button>
            </Form>)
            }
        </Formik>
        </div>
    );
 };


 export default RegisterForm;