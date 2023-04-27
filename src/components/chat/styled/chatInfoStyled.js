import styled from "styled-components";

export const ChatInfoContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid #1d7a6e;
  -webkit-background-clip: padding-box; /* for Safari */
  background-clip: padding-box; /* for IE9+, Firefox 4+, Opera, Chrome */
  padding: 5px;
  color: white;
  max-height: 70px;
  cursor: pointer;

  &:hover {
    background-color: #1d7a6e;
  }

  @media only screen and (max-width: 780px) {
    padding-bottom: 10px;
    max-height: 80px;
  }
`;

export const ChatInfoStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 10px 15px 10px 0px;
  cursor: pointer;
`;

export const ImgContainer = styled.div`
  flex: 0.5;
`;
export const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;
export const UserChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;
export const ChatInfoHeader = styled.div`
  padding-bottom: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Username = styled.span`
  font-weight: 600;
`;
export const Time = styled.p`
  font-weight: 200;
  font-size: 11px;
`;
export const LatestMessage = styled.p`
  font-weight: 300;
  font-size: 0.8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1; /* number of lines to show */
  line-clamp: 1;
  -webkit-box-orient: vertical;
`;
