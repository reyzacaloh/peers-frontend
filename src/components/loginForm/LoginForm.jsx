import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Form,
  Label,
  Button,
  Error,
  Wrapper,
  Container,
  Text,
  Title,
} from "../registerForm/RegisterStyledComponents";
import { Register } from "./LoginFormStyle";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { showErrorToast } from "../../utils/common";
import { ToastContainer } from "react-toastify";
const LoginForm = () => {
  const { dispatch } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    pass: "",
  };
  const onSubmit = async (values, actions) => {
    try {
      let response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/token/`, {
        email: values.email,
        password: values.pass,
      });
      actions.setSubmitting(false);
      console.log("Success");
      actions.setStatus("success");

      dispatch({
        type: "LOGIN",
        payload: {
          token: response.data["access"],
        },
      });

      if (response.data["is_tutor"]) {
        dispatch({
          type: "TUTOR",
        });
      }

      navigate("/");
    } catch (err) {
      console.log("Error: ", err);
      actions.setStatus(err.code);
      errorHandler(err.code)
      actions.setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid")
      .min(11, "invalid email")
      .required("Required"),
    pass: Yup.string()
      .required("Required")
      .min(5, "Password minimal 5 karakter"),
  });

  function errorHandler(status) {
    if (status === "ERR_BAD_REQUEST") {
      showErrorToast("email/password salah!");
    } else if (status === "ERR_NETWORK") {
      showErrorToast("Jaringan error! Silahkan coba lagi nanti");
    } else {
      showErrorToast("Unknown error!");
    }
  }
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <Container>
      <ToastContainer />
      <Wrapper>
        <Form onSubmit={formik.handleSubmit}>
        <Title>Sign In</Title>
          <Label>Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Alamat Email"
            data-testid="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            size="large"
            status= {formik.touched.email && formik.errors.email ? 'error' : ''}
          />
          {formik.touched.email && (
            <Error className="error">{formik.errors.email}</Error>
          )}

          <Label>Password</Label>
          <Input.Password
              id="pass"
              data-testid="pass"
              name="pass"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Password"
              size="large"
              status= {formik.touched.pass && formik.errors.pass ? 'error' : ''}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              required
          />
          {formik.touched.pass && (
            <Error className="error">{formik.errors.pass}</Error>
          )}

          <Button
            type="submit"
            disabled={formik.isSubmitting || formik.status === "success"}
          >
            {formik.isSubmitting ? "Loading..." : "Login"}
          </Button>
          <Register>
            <Text>
              Belum punya akun?&nbsp;
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "15px",
                  cursor: "pointer",
                }}
                to={"/register"}
              >
                Register
              </Link>
            </Text>
          </Register>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default LoginForm;
