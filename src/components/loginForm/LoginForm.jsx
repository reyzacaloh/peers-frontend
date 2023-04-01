import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Form,
  Input,
  Label,
  Button,
  Error,
  Wrapper,
  Container,
  Text,
  Title,
  Register,
} from "./LoginFormStyle";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";


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
      navigate("/");
    } catch (err) {
      console.log("Error: ", err);
      actions.setStatus(err.code);
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

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <Error center>
          {formik.status === undefined || formik.status === "success"
            ? ""
            : errorHandler(formik.status)}
        </Error>
        <Form onSubmit={formik.handleSubmit}>
          <Label>Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
            data-testid="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && (
            <Error className="error">{formik.errors.email}</Error>
          )}

          <Label>Password</Label>
          <Input
            type="password"
            id="pass"
            name="pass"
            placeholder="Password"
            data-testid="pass"
            onChange={formik.handleChange}
            value={formik.values.pass}
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
              Doesn't have an account?&nbsp;
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

function errorHandler(status) {
  if (status === "ERR_BAD_REQUEST") {
    return "Incorrect email/password!";
  } else if (status === "ERR_NETWORK") {
    return "Network error! Try again later";
  } else {
    return "Unknown error!";
  }
}

export default LoginForm;
