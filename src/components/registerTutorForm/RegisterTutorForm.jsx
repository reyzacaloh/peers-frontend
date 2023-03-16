import React from 'react';
import {Formik} from 'formik';
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import {Form, Input, Label, Button, Error} from "../registerForm/RegisterStyledComponents.js"

const RegisterTutorForm = () => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid').min(11, "invalid email").required('Required'),
        name: Yup.string().required('Required').min(1, 'Nama tidak boleh kosong'),
        npm: Yup.number().required('Required').min(10, 'Nomor mahasiswa tidak valid'),
    })
    
    return (
        <Formik
        initialValues={{
           
        }}
        enableReinitialize={true}
        validationSchema = {validationSchema}
        onSubmit= {async (values,actions) => {
        console.log("Values: ", values);
        const formData = new FormData();
            formData.append("email", values.email);
            formData.append("name", values.name);
            formData.append("npm", values.npm);
            formData.append("idedntity", selectedFile);
        try {
            <div><h1>Registration Form</h1></div>
            const response =  await axios.post(
                "https://peers-backend-dev.up.railway.app/api/tutor_form/upload/",
                formData,
                {headers: {
                    "content-type": "multipart/form-data",
                }}
                );
            console.log(response);
            actions.setStatus('success');
            navigate("/");
        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.message);
        }
        }}>
        
        {formik => (
            <Form onSubmit={formik.handleSubmit} data-testid="tutor_form">
                <h1>Tutor Register Form</h1>
                <Label htmlFor="email" >Email Akademik :<br></br></Label>
                <Input 
                id="email"
                data-testid="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
                /><br></br>
                {formik.touched.email && (<Error className="error">{formik.errors.email}</Error>)}
                <Label htmlFor="name" >Nama sesuai KTP :<br></br></Label>
                <Input
                id="name"
                data-testid="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
                /> <br></br>
                {formik.touched.name && (<Error className="error">{formik.errors.name}</Error>)}
                <Label htmlFor="npm" required>NIM/NPM :<br></br></Label>
                <Input
                id="npm"
                data-testid="npm"
                name="npm"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.npm}
                required
                /><br></br>
                {formik.touched.npm && (<Error className="error">{formik.errors.npm}</Error>)}
                <Label htmlFor="identity" required>Kartu Identitas/KTP :<br></br></Label>
                <Input
                id="identity"
                data-testid="identity"
                name="identity"
                type="file"
                onChange={(event) => {
                    setSelectedFile(event.currentTarget.files[0]);
                  }}
                value={formik.values.identity}
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
    );
 };


 export default RegisterTutorForm;

