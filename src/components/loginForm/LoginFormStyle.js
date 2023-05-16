

import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background-color: #279686;
`;

export const Wrapper = styled.div`
  background-color: white;
  width: 30%;
  padding: 20px;
  padding-top: 5px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);

  @media only screen and (max-width: 425px) {
    width: 80%;
  }
  @media only screen and (max-width: 1024px) {
    width: 90%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export const Input = styled.input.attrs({required:true})`
  flex: 1;
  min-width: 40%;
  font-size: 17px;
  margin: 5px 10px 0px 0px;
  outline-color: #279686;
  border-bottom: 1px solid gray;
  padding-top: 10px;

`;

export const Label = styled.span`
  color: 'black';
  margin-top: 20px;
  bottom: 0;
  padding-top: 10px;
  font-weight: 600;
`;

export const Title = styled.h1`
  font-weight: 400;
  padding-left: 10px;
`;

export const Register = styled.div`
  font-size: 15px;
  margin: 15px 0px;
  text-align: center;
`;
