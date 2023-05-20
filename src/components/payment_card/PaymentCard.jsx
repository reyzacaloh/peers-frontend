import React from 'react'
import { FieldItem, FieldLabel, FieldWrapper, PaymentCardContainer, TutorSection, Text, ButtonSection, Button } from './styledPaymentCard'
import { currencyFormat, showErrorToast, showSuccessToast, toTimestamp } from '../../utils/common';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { ChatContext } from "../../contexts/ChatContext"
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase"

const PaymentCard = ({data}) => {
  const { currentUser } = React.useContext(ChatContext);
  const {transaction_id, tutor_name, subject, schedule, price, date, snap_token} = data || {};
  const getContacts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/booking/booking-paid`,
        {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        }
      );
      const book_list = response.data.booking_list;
      book_list.forEach(async (item) => {
        const combinedId =
          currentUser.uid > item.tutor_uid
            ? currentUser.uid + item.tutor_uid
            : item.tutor_uid + currentUser.uid;

        const learner_check = await getDoc(
          doc(db, "userChats", currentUser.uid)
        );
        if (!learner_check.exists()) {
          await setDoc(doc(db, "userChats", currentUser.uid), {});
        }

        const tutor_check = await getDoc(
          doc(db, "userChats", item.tutor_uid)
        );
        if (!tutor_check.exists()) {
          await setDoc(doc(db, "userChats", item.tutor_uid), {});
        }

        const res = await getDoc(doc(db, "chats", combinedId));

        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              latest_message: "",
              profile_pic: item.profile_pic,
              uid: item.tutor_uid,
              username: item.tutor_name,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", item.tutor_uid), {
            [combinedId + ".userInfo"]: {
              latest_message: "",
              profile_pic: currentUser.profile_picture,
              uid: currentUser.uid,
              username: currentUser.first_name + " " + currentUser.last_name,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePayment = (transaction_token) => {
    window.snap.pay(transaction_token, {
      onSuccess: function (result) {
        getContacts()
        alert("Success");console.log(result);
      },
      onPending: function (result) {
        alert("Pending");console.log(result);
      },
      onError: function (result) {
        console.log(result);
      },
      onClose: function() {
        console.log("Closed")
      }
    });
  }

  const handleCancel = async (order_id) => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/booking/cancel`,{
          order_id
        },{
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        })
        console.log(response.data)
        showSuccessToast("Booking has been cancelled!")
      } catch(err) {
        console.log(err)
        showErrorToast("Booking can't be cancelled, Try again later!");
      }
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
            <FieldLabel>Order ID</FieldLabel>
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
        <Button cancel onClick={() => handleCancel(transaction_id)}>Cancel</Button>
        <ToastContainer style={{width: 'fit-content',margin: 'auto'}} toastClassName={"toast-style"}/>
      </ButtonSection>
    </PaymentCardContainer>
  )
}

export default PaymentCard