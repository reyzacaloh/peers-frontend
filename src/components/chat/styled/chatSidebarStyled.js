import styled from "styled-components";

export const ChatSidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #279686;
  flex: 1;
  border-right: 1px solid lightgray;
  overflow: hidden;
  height: 100vh;

  @media only screen and (max-width: 425px) {
    flex: ${(props) => props.back && "0"};
  }
`;
export const SidebarTop = styled.div`
  display: flex;
  flex-basis: 10%;
  flex-grow: 0;
  flex-shrink: 0;
  top: 0;
  width: 100vw;
  z-index: 9999;
  align-items: center;
  padding-left: 5px;
  color: white;
  background-color: #1d7a6e;
  max-height: 60px;
`;
export const SidebarBottom = styled.div`
  flex-basis: 90%;
  flex-grow: 0;
  flex-shrink: 0;
  max-height: 100vh;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }
`;
export const BackBtn = styled.span`
  cursor: pointer;
  font-weight: 400;
  font-size: 20px;
`;
