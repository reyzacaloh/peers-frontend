/* eslint-disable react-hooks/exhaustive-deps */
import {React, useState} from "react";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input} from 'antd';
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  Label,
  Button,
  Error,
  Container,
  Wrapper,
  Title,
  Text,
  Login,
} from "./RegisterStyledComponents";
import { showErrorToast, showSuccessToast } from "../../utils/common";
import { ToastContainer } from "react-toastify";
import Resizer from "react-image-file-resizer";
const RegisterForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  function errorHandler(status) {
    if (status === "ERR_BAD_REQUEST") {
      showErrorToast("Email anda sudah terdaftar. Mohon login");
    } else if (status === "ERR_NETWORK") {
      showErrorToast("Jaringan error! Silahkan coba lagi nanti");
    } else {
      showErrorToast("Unknown error!");
    }
  }
  const onImgChange = (img) => {
    const file = img;
    Resizer.imageFileResizer(
      file, // the file from input
      480, // width
      480, // height
      "JPEG", // compress format WEBP, JPEG, PNG
      70, // quality
      0, // rotation
      (uri) => {
        setSelectedFile(uri);
        // You upload logic goes here
      },
      "file"
    );
  }
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid")
      .min(11, "invalid email")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .min(5, "Password minimal 5 karakter"),
    date_of_birth: Yup.date()
      .required("Required")
      .max("2010-1-1", "Minimal 13 tahun untuk registrasi"),
    first_name: Yup.string().required("Required").min(2, "Minimal 2 karakter"),
    last_name: Yup.string().required("Required").min(2, "Minimal 2 karakter"),
  });
  return (
    <Container id="regis-form">
      <ToastContainer />
      <Wrapper>
        <Formik
          initialValues={{}}
          enableReinitialize={true}
          className="formik"
          validationSchema={validationSchema}
          onSubmit={async (values, actions) => {
            try {
              const formData = new FormData();
              formData.append("email", values.email);
              formData.append("password", values.password);
              formData.append("first_name", values.first_name);
              formData.append("last_name", values.last_name);
              formData.append("date_of_birth", values.date_of_birth);
              formData.append("profile_picture", selectedFile);
       
              await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/register/`,
                formData,
                {
                  headers: {
                    "content-type": "multipart/form-data",
                  },
                }
              );
              console.log(formData);
              console.log("success");
              actions.setStatus("success");
              showSuccessToast();
              setTimeout(() => {
                navigate("/login");
              }, "1500");

            } catch (err) {
              
              console.log("Error: ", err);
              actions.setStatus(err.code);
              errorHandler(err.code);
            }
          }}
        >
          {(formik) => (
            <Form onSubmit={formik.handleSubmit} data-testid="form">
              <Title>Register Form</Title>
              <Label htmlFor="email">Alamat Email</Label>
              <Input
                id="email"
                data-testid="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                size="large"
                status= {formik.touched.email && formik.errors.email ? 'error' : ''}
                placeholder="Email Address"
                
              />
              {formik.touched.email && (
                <Error className="error">{formik.errors.email}</Error>
              )}
              <Label htmlFor="password">Password</Label>
              <Input.Password
                id="password"
                data-testid="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder="Password"
                size="large"
                status= {formik.touched.password && formik.errors.password ? 'error' : ''}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                
              />
              {formik.touched.password && (
                <Error className="error">{formik.errors.password}</Error>
              )}
              <Label htmlFor="first_name" >Nama Depan</Label>
              <Input
                id="first_name"
                data-testid="first_name"
                name="first_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.first_name}
                placeholder="First Name"
                size="large"
                status= {formik.touched.first_name && formik.errors.first_name ? 'error' : ''}
                
              />
              {formik.touched.first_name && (
                <Error className="error">{formik.errors.first_name}</Error>
              )}
              <Label htmlFor="last_name" >Nama Belakang</Label>
              <Input
                id="last_name"
                data-testid="last_name"
                name="last_name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.last_name}
                placeholder="Last Name"
                size="large"
                status= {formik.touched.last_name && formik.errors.last_name ? 'error' : ''}
                
              />
              {formik.touched.last_name && (
                <Error className="error">{formik.errors.last_name}</Error>
              )}
              <Label htmlFor="date_of_birth" required>
                Tanggal Lahir
              </Label>
              <Input
                id="date_of_birth"
                data-testid="date_of_birth"
                name="date_of_birth"
                type="date"
                size="large"
                status= {formik.touched.date_of_birth && formik.errors.date_of_birth ? 'error' : ''}
                onChange={formik.handleChange}
                value={formik.values.date_of_birth}
                
              />
              {formik.touched.date_of_birth && (
                <Error className="error">{formik.errors.date_of_birth}</Error>
              )}
              <Label htmlFor="profile_picture" required>
                Gambar Profil
              </Label>
              <Input
                id="profile_picture"
                data-testid="profile_picture"
                name="profile_picture"
                type="file"
                onChange={(event) => {
                  onImgChange(event.currentTarget.files[0])
                }}
                value={formik.values.profile_picture}
                accept=".jpg,.jpeg"
                required
              />
              <Button
                type="submit"
                disabled={formik.isSubmitting || formik.status === "success"}
              >
                {formik.isSubmitting ? "Loading..." : "Register"}
              </Button>
              <Login>
                <Text>
                  Sudah punya akun?&nbsp;
                  <Link
                    style={{
                      textDecoration: "none",
                      fontSize: "15px",
                      cursor: "pointer",
                    }}
                    to={"/login"}
                  >
                    Login
                  </Link>
                </Text>
              </Login>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Container>
  );
};


export default RegisterForm;
