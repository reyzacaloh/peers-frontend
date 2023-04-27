import styled from "styled-components";

export const Label = styled.span`
  margin-top: 20px;
  bottom: 0;
  font-weight: 600;
`;

export const Title = styled.h1`
  font-weight: 400;
  padding: 0 10px 0 10px;
  margin-top: 20px;
`;

export const Button = styled.button`
  min-width: 40%;
  padding: 5px;
  margin-top: 40px;
  border-radius: 5px;
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