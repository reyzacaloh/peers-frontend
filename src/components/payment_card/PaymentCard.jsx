import React from 'react'
import { FieldItem, FieldLabel, FieldWrapper, PaymentCardContainer, TutorSection, Text, ButtonSection, Button } from './styledPaymentCard'
import { currencyFormat, toTimestamp } from '../../utils/common';

const PaymentCard = ({data}) => {
  const {transaction_id, tutor_name, subject, schedule, price, date, snap_token} = data || {};
  const handlePayment = (transaction_token) => {
    console.log(transaction_token)
    window.snap.pay(transaction_token, {
      onSuccess: function (result) {
        alert("Success");console.log(result);
      },
      onPending: function (result) {
        alert("Pending");console.log(result);
      },
      onError: function (result) {
        alert(result);console.log(result);
      }
    });
  }
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
            <Text>{toTimestamp(schedule)}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Transaction ID</FieldLabel>
            <Text>{transaction_id}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Created at</FieldLabel>
            <Text>{toTimestamp(date)}</Text>
          </FieldItem>
          <FieldItem>
            <FieldLabel>Total</FieldLabel>
            <Text>{currencyFormat(price)}</Text>
          </FieldItem>
        </FieldWrapper>
      </TutorSection>
      <ButtonSection>
        <Button primary onClick={() => handlePayment(snap_token)}>Pay</Button>
        <Button cancel>Cancel</Button>
      </ButtonSection>
    </PaymentCardContainer>
  )
}

export default PaymentCard