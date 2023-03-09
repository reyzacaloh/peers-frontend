import styled from "styled-components";

export const Form = styled.form`
  background-color: #f4f4f4;
  max-width: fit-content;
  padding: 20px;
  border-radius: 20px;
  overflow: none;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: black;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
  background-color: #279686;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
  &:enabled {
    opacity: 1.0;
  }
  opacity: ${props => !props.enabled ? 0.5 : 1};
`;

export const Error = styled.span`
  padding: 10px;
  color: red;
  margin-top: 10px;
  border-radius: 5px;
`;