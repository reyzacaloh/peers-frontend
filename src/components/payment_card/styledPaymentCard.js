import styled from "styled-components";

export const PaymentCardContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  max-width: 100%;
  border-radius: 30px;
  margin: 0;
  padding: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
`;
export const TutorSection = styled.div`
  display: flex;
  flex: 3;
`;
export const ButtonSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;
export const FieldWrapper = styled.div``;
export const FieldItem = styled.div`
  margin-bottom: 10px;
`;
export const FieldLabel = styled.span`
  font-size: 14;
  color: gray;
  font-weight: 300;
  text-transform: capitalize;
`;
export const Text = styled.p`
  color: black;
  font-size: 17;
  font-weight: 500;
  text-transform: capitalize;
`;
export const Button = styled.div`
  background-color: ${props => props.primary && "#2AAA8A"};
  width: 100%;
  height: 40px;
  border-radius: 10px;
  color: ${props => props.primary && "white"};
  text-transform: uppercase;
  align-items: center;
  justify-content: center;
  display: flex;
  border: ${props => props.cancel && "1px solid gray"};
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
`;
