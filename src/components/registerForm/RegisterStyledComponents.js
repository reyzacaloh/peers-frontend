import styled from "styled-components";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
  padding: 20px 50px 30px 50px;

  @media only screen and (max-width: 425px) {
    padding: 30px 5px 30px 5px;

  }
`;

export const Wrapper = styled.div`
  background-color: white;
  width: 50%;
  padding: 20px;
  padding-top: 5px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);

  @media only screen and (max-width: 425px) {
    width: 100%;
    padding: 15px;
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
  padding-bottom: 10px;

`;

export const Label = styled.label`
  color: 'black';
  margin-top: 20px;
  bottom: 0;
  padding-top: 10px;
  font-weight: 600;
`;

export const Title = styled.h1`
  font-weight: 400;
`;

export const Login = styled.div`
  font-size: 15px;
  margin: 15px 0px;
  text-align: center;
`;


export const Text = styled.p``;

export const Button = styled.button`
  min-width: 40%;
  padding: 5px;
  margin: 30px 10px 0px 0px;
  font-weight: 500;
  font-size: 20px;
  background-color: #279686;
  color: white;
  border: 1px solid #279686;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.4s ease;
  &:hover {
    opacity: 1;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;


export const Error = styled.p`
  color: red;
  margin-top: 10px;
  text-align: ${(props) => props.center ? "center" : "left"};
`;