import styled from "styled-components";

export const ChatBoxContainer = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;

  @media only screen and (max-width: 780px) {
    flex: ${(props) => props.back && "0"};
  }
`;
export const ChatBoxTop = styled.div`
  display: flex;
  align-items: center;
  color: white;
  flex-basis: 10%;
  flex-grow: 0;
  flex-shrink: 0;
  background-color: #1d7a6e;
  max-height: 60px;
  width: 100%;
`;
export const ChatBoxHeader = styled.div`
  flex: 1;
  display: flex;
  padding: 10px 20px 10px 10px;
`;
export const UserInfo = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;
export const UserInfoProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
`;
export const Username = styled.span``;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  ${Username} {
    font-weight: 700px;
    font-size: 18px;
  }
`;
export const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ReportBtnContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const CloseBtn = styled.span`
  cursor: pointer;
  text-transform: uppercase;
  @media only screen and (max-width: 780px) {
    display: none;
  }
`;

/* Blank Chat Container */
export const BlankChatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  > img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    opacity: 0.8;
  }

  > h1 {
    font-weight: 700;
    color: gray;
    opacity: 0.5;
  }
`;
