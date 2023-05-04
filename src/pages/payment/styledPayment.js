import styled from "styled-components";

export const PaymentPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 5px;

  &::-webkit-scrollbar {
    display: none;
  }

  @media only screen and (max-width: 725px) {
    margin-top: 70px;
  }
`