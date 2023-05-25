import React from "react";
import {
  FieldItem,
  FieldLabel,
  FieldWrapper,
  PaymentCardContainer,
  TutorSection,
  Text,
  ButtonSection,
  Button,
} from "./styledPaymentCard";
import {
  currencyFormat,
  showErrorToast,
  showSuccessToast,
  toTimestamp,
} from "../../utils/common";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const PaymentCard = ({ data }) => {
  const {
    transaction_id,
    tutor_name,
    subject,
    schedule,
    price,
    date,
    snap_token,
  } = data || {};

  const handlePayment = (transaction_token) => {
    window.snap.pay(transaction_token, {
      onSuccess: function (result) {
        alert("Success");
        console.log(result);
      },
      onPending: function (result) {
        alert("Pending");
        console.log(result);
      },
      onError: function (result) {
        console.log(result);
      },
      onClose: function () {
        console.log("Closed");
      },
    });
  };

  const handleCancel = async (order_id) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/booking/cancel`,
        {
          order_id,
        },
        {
          headers: {
            authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      console.log(response.data);
      showSuccessToast("Booking has been cancelled!");
    } catch (err) {
      console.log(err);
      showErrorToast("Booking can't be cancelled, Try again later!");
    }
  };
  return (
    <PaymentCardContainer>
      <TutorSection>
        <FieldWrapper>
          <FieldItem>
            <FieldLabel>Tutor Name</FieldLabel>
            <Text>{tutor_name}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Subject</FieldLabel>
            <Text>{subject}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Schedule</FieldLabel>
            <Text data-testid="schedule-test">{toTimestamp(schedule)}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Order ID</FieldLabel>
            <Text>{transaction_id}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Created at</FieldLabel>
            <Text data-testid="created-date">{toTimestamp(date)}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Total</FieldLabel>
            <Text>{currencyFormat(price)}</Text>
          </FieldItem>
        </FieldWrapper>
      </TutorSection>
      <ButtonSection>
        <Button primary onClick={() => handlePayment(snap_token)}>
          Pay
        </Button>
        <Button cancel onClick={() => handleCancel(transaction_id)}>
          Cancel
        </Button>
        <ToastContainer
          style={{ width: "fit-content", margin: "auto" }}
          toastClassName={"toast-style"}
        />
      </ButtonSection>
    </PaymentCardContainer>
  );
};

export default PaymentCard;
