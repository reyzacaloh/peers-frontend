import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Container, Form, Wrapper} from "../loginForm/LoginFormStyle"
import {Button, Label, Title} from "../tutorScheduleForm/TutorScheduleFormStyle";
import {Input} from "antd";
import {showErrorToast, showSuccessToast} from "../../utils/common";
import {Text} from "../registerForm/RegisterStyledComponents";
import {Register} from "../loginForm/LoginFormStyle";

const TutorScheduleForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(35000);

  const handleEditPrice = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/tutor_form/price/`,
        {new_price:`${message}`},
        {headers: {
            "content-type": "application/x-www-form-urlencoded",
            "authorization": `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          }}
      );
      console.log(response);
      console.log("Success");
      showSuccessToast("Pergantian harga berhasil!");
      navigate("/tutor/dashboard");
    } catch (err) {
      console.log("Error: ", err);
      showErrorToast("Gagal mengganti harga, silahkan dicoba lagi")
    }
  };

  const handlePriceChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Edit Your Rates</Title>
        <Form onSubmit={handleEditPrice}>
          <Label>Price</Label>
          <Input
            id="price_per_hour"
            data-testid="price_per_hour"
            name="price_per_hour"
            type="number"
            min="0"
            onChange={handlePriceChange}
            value={message}
            size="large"
            addonBefore="Rp "
            addonAfter="/jam"
            required
          />

          <Button type="submit">
            Update
          </Button>

          <Register>
            <Text>
              Ingin mencairkan dana? Hubungi kami di peers.tech.id@gmail.com
            </Text>
          </Register>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default TutorScheduleForm;
