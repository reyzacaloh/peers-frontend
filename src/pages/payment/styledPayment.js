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

export const BlankContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;

  text-align: center;
  font-size: 40px;
  font-weight: 700;
  text-transform: uppercase;
  color: gray;
  overflow: hidden;

`