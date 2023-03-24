import React from 'react';
import {Formik} from 'formik';
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import {Form, Input, Label, Button, Error} from "../registerForm/RegisterStyledComponents.js"
import { subjectOption } from "../../docs/data";
import CustomSelect from './CustomSelect'

const RegisterTutorForm = () => {
    const [selectedFile1, setSelectedFile1] = React.useState(null);
    const [selectedFile2, setSelectedFile2] = React.useState(null);
    const [selectedFile3, setSelectedFile3] = React.useState(null);
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        subject: Yup.string().required('Required'),
        university: Yup.string().required('Required').min(2, 'Universitas tidak valid'),
        pddikti: Yup.string().required('Required').min(40, 'Alamat tidak valid'),
    })
    
    return (
        <Formik
        initialValues={{
            subject : " ",
        }}
        enableReinitialize={true}
        validationSchema = {validationSchema}
        onSubmit= {async (values,actions) => {
        console.log("Values: ", values);
        const formData = new FormData();
            formData.append("subject", values.subject);
            formData.append("university", values.university);
            formData.append("pddikti", values.pddikti);
            formData.append("ktp", selectedFile1);
            formData.append("ktm_person", selectedFile2);
            formData.append("transkrip", selectedFile3);
        try {
            <div><h1>Registration Form</h1></div>
            const response =  await axios.post(
                "https://peers-backend-dev.up.railway.app/api/tutor_form/upload/",
                formData,
                {headers: {
                    "content-type": "multipart/form-data",
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
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
                <Label htmlFor="subject" >Subject :<br></br></Label>
                <CustomSelect
                className="subject"
                onChange={value=>formik.setFieldValue('subject',value.value)}
                value={formik.values.subject}
                options={subjectOption}
                />
                <br></br>
                {formik.touched.subject && (<Error className="error">{formik.errors.subject}</Error>)}
                <Label htmlFor="university" >Universitas asal :<br></br></Label>
                <Input
                id="university"
                data-testid="university"
                name="university"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.university}
                required
                /> <br></br>
                {formik.touched.university && (<Error className="error">{formik.errors.university}</Error>)}
                <Label htmlFor="pddikti" required>Alamat PDDIKTI :<br></br></Label>
                <Input
                id="pddikti"
                data-testid="pddikti"
                name="pddikti"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.pddikti}
                required
                /><br></br>
                {formik.touched.pddikti && (<Error className="error">{formik.errors.pddikti}</Error>)}
                <Label htmlFor="ktp" required>Kartu Identitas/KTP :<br></br></Label>
                <Input
                id="ktp"
                data-testid="ktp"
                name="ktp"
                type="file"
                onChange={(event) => {
                    setSelectedFile1(event.currentTarget.files[0]);
                  }}
                value={formik.values.ktp}
                accept=".jpg,.jpeg"
                required
                /><br></br>
                <Label htmlFor="ktm_person" required>KTM dan Muka:<br></br></Label>
                <Input
                id="ktm_person"
                data-testid="ktm_person"
                name="ktm_person"
                type="file"
                onChange={(event) => {
                    setSelectedFile2(event.currentTarget.files[0]);
                  }}
                value={formik.values.ktm_person}
                accept=".jpg,.jpeg"
                required
                /><br></br>
                <Label htmlFor="transkrip" required>Transkrip Nilai :<br></br></Label>
                <Input
                id="transkrip"
                data-testid="transkrip"
                name="transkrip"
                type="file"
                onChange={(event) => {
                    setSelectedFile3(event.currentTarget.files[0]);
                  }}
                value={formik.values.transkrip}
                accept=".pdf"
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

