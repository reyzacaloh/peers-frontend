import axios from "axios";
import { Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { AuthContext } from '../../contexts/AuthContext.js';
import { Input } from 'antd';
import { subjectOption } from "../../docs/data";
import { Button, Error, Form, Label, Wrapper, Title } from "../registerForm/RegisterStyledComponents.js";
import { showErrorToast, showSuccessToast } from "../../utils/common";
import { ToastContainer } from "react-toastify";
import CustomSelect from './CustomSelect';
import Resizer from "react-image-file-resizer";
const RegisterTutorForm = () => {
    const {dispatch} = React.useContext(AuthContext);
    const [selectedFile1, setSelectedFile1] = React.useState(null);
    const [selectedFile2, setSelectedFile2] = React.useState(null);
    const [selectedFile3, setSelectedFile3] = React.useState(null);
    const navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        subject: Yup.string().required('Required'),
        university: Yup.string().required('Required').min(2, 'Universitas tidak valid'),
        pddikti: Yup.string().required('Required').min(40, 'Alamat tidak valid'),
    })
    const onImgChange = (img, setter) => {
        const file = img;
        Resizer.imageFileResizer(
          file, // the file from input
          1100, // width
          1100, // height
          "JPEG", // compress format WEBP, JPEG, PNG
          80, // quality
          0, // rotation
          (uri) => {
            setter(uri);
            // You upload logic goes here
          },
          "file"
        );
      }
    return (
        <Wrapper>
            <ToastContainer />
        <Formik
        initialValues={{
            subject : " ",
            price_per_hour : 35000
        }}
        enableReinitialize={true}
        validationSchema = {validationSchema}
        onSubmit= {async (values,actions) => {
        const formData = new FormData();
            formData.append("subject", values.subject);
            formData.append("university", values.university);
            formData.append("pddikti", values.pddikti);
            formData.append("desc", values.desc);
            formData.append("price_per_hour", values.price_per_hour);
            formData.append("ktp", selectedFile1);
            formData.append("ktm_person", selectedFile2);
            formData.append("transkrip", selectedFile3);
        console.log(formData)
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/tutor_form/upload/`,
                formData,
                {headers: {
                    "content-type": "multipart/form-data",
                    "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
                }}
                );
            actions.setStatus('success');
            console.log(response);
            dispatch({
                type: "TUTOR"
            });
            showSuccessToast("Registrasi berhasil!");
            setTimeout(() => {
                navigate("/");
            }, "1500");
        } catch (err) {
            console.log("Error: ", err);
            actions.setStatus(err.message);
            showErrorToast("Maaf gagal mengirimkan data, silahkan dicoba lagi")
        }
        }}>
        
        {formik => (
            <Form onSubmit={formik.handleSubmit} className='tutor_form' data-testid="tutor_form">
                <Title>Tutor Register Form</Title>
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
                size="large"
                status= {formik.touched.university && formik.errors.university ? 'error' : ''}
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
                size="large"
                status= {formik.touched.pddikti && formik.errors.pddikti ? 'error' : ''}
                required
                /><br></br>
                {formik.touched.pddikti && (<Error className="error">{formik.errors.pddikti}</Error>)}
                <Label htmlFor="desc" required>Deskripsi :<br></br></Label>
                <Input.TextArea
                id="desc"
                data-testid="desc"
                name="desc"
                type="text"
                rows={3}
                maxLength={150}
                placeholder="Deskripsikan diri anda secara singkat (maks 150 huruf)"
                onChange={formik.handleChange}
                value={formik.values.desc}
                size="large"
                status= {formik.touched.desc && formik.errors.desc ? 'error' : ''}
                required
                /><br></br>
                {formik.touched.desc && (<Error className="error">{formik.errors.desc}</Error>)}
                <Label htmlFor="price_per_hour" required>Harga Tutoring :<br></br></Label>
                <Input
                id="price_per_hour"
                data-testid="price_per_hour"
                name="price_per_hour"
                type="number"
                min="0"
                onChange={formik.handleChange}
                value={formik.values.price_per_hour}
                size="large"
                addonBefore="Rp " 
                addonAfter="/jam"
                status= {formik.touched.price_per_hour && formik.errors.price_per_hour ? 'error' : ''}
                required
                /><br></br>
                {formik.touched.price_per_hour && (<Error className="error">{formik.errors.price_per_hour}</Error>)}
                <Label htmlFor="ktp" required>Kartu Identitas/KTP :<br></br></Label>
                <Input
                id="ktp"
                data-testid="ktp"
                name="ktp"
                type="file"
                onChange={(event) => {
                    onImgChange(event.currentTarget.files[0], setSelectedFile1)
                  }}
                value={formik.values.ktp}
                accept=".jpg,.jpeg"
                size="large"
                required
                /><br></br>
                <Label htmlFor="ktm_person" required>KTM dan Muka:<br></br></Label>
                <Input
                id="ktm_person"
                data-testid="ktm_person"
                name="ktm_person"
                type="file"
                onChange={(event) => {
                    onImgChange(event.currentTarget.files[0], setSelectedFile2)
                  }}
                value={formik.values.ktm_person}
                accept=".jpg,.jpeg"
                size="large"
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
                size="large"
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
        </Wrapper>
    );
 };


 export default RegisterTutorForm;

