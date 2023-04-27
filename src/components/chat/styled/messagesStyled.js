import styled from "styled-components";

export const MessageContainer = styled.div`
  background-color: #ddddf7;
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;
