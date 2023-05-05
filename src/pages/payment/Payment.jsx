import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BlankContainer, PaymentPage } from './styledPayment';
import PaymentCard from '../../components/payment_card/PaymentCard';

const Payment = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const getBills = async () => {
      try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/booking/booking-list`, {
          headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
          }
        })
        setBills(response.data.booking_list);
      } catch(err) {
        console.log(err)
      }
    }

    getBills();
  },[])

  useEffect(() => {
    // You can also change below url value to any script url you wish to load, 
    // for example this is snap.js for Sandbox Env (Note: remove `.sandbox` from url if you want to use production version)
    const midtransScriptUrl = `${process.env.REACT_APP_MIDTRANS_SCRIPT_URL}`;  
    console.log(midtransScriptUrl)
    let scriptTag = document.createElement('script');
    scriptTag.src = midtransScriptUrl;
  
    // Optional: set script attribute, for example snap.js have data-client-key attribute 
    // (change the value according to your client-key)
    const myMidtransClientKey = `${process.env.REACT_APP_MIDTRANS_CLIENT_KEY}`;
    scriptTag.setAttribute('data-client-key', myMidtransClientKey);
  
    document.body.appendChild(scriptTag);
  
    return () => {
      document.body.removeChild(scriptTag);
    }
  }, []);
  
  return (
    <PaymentPage>
      {bills.length > 0 ? bills?.map((bill, idx) => {
        return (
          <PaymentCard data={bill} key={idx}/>
        )
      }) : (
        <BlankContainer>
          No Billing
        </BlankContainer>
      )}
    </PaymentPage>
  )
}

export default Payment