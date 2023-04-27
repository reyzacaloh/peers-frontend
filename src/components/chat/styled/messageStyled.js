import styled from "styled-components";

export const Img = styled.img`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
`;
export const Span = styled.span``;
export const MessageInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: gray;
  font-weight: 300px;

  ${Span} {
    font-size: 0%.8rem;
  }
`;

export const Text = styled.p``;
export const MessageImg = styled.img``;
export const MessageContent = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${Text} {
    background-color: white;
    text-align: justify;
    hyphens: auto;
    -webkit-hyphens: auto;
    word-break: break-all;
    max-width: max-content;
    margin: 0;
    padding: 10px 20px;
    border-radius: 0px 10px 10px 10px;
  }
  ${MessageImg} {
    width: 50%;
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-direction: ${props => props.owner && "row-reverse"};

  ${MessageContent} {
    align-items: ${props => props.owner && "flex-end"};

    ${Text} {
      background-color: ${props => props.owner && "#8da4f1"};
      color: ${props => props.owner && 'white'};
      border-radius: ${props => props.owner && '10px 0px 10px 10px'}
    }
  }


  
`;
