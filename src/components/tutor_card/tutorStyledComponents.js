import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 15px;
`;
export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  bottom: 0;
  z-index: 999;
  padding: 0 10px 10px 20px;

  @media only screen and (max-width: 425px) {
    font-size: 12px;
    font-weight: 200;
  }
`;

export const Name = styled.h3`
  text-align: left;
  margin:0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 425px) {
    margin: 10px 5px 2px 0px;
  }
`;

export const University = styled.p`
  text-align: left;
  margin: 0;
  font-weight: 150;
  letter-spacing: 0.5px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex: 3;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  ${Image} {
    transition: transform 1s ease;
  }
  ${Wrapper} {
    transition: transform 1s ease;
  }
`;

export const Card = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  max-width: 300px;
  border-radius: 30px;
  min-width: 250px;
  background-color: white;
  -webkit-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  -moz-box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);
  box-shadow: 0px 11px 18px 1px rgba(0, 0, 0, 0.11);

  &:hover {
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
    -webkit-transition: transform 1s ease 0s;
    transition: transform 1s ease 0s;
    background-color: #fafafa;

    ${ImageContainer} {
      ${Image} {
        transform: scale(1.1);
      }
    }
  }

  @media only screen and (max-width: 425px) {
    max-width: 180px;
    min-width: 100px;

    border-radius: 15px;
  }
`;

export const Description = styled.div`
  flex: 1;
  padding: 0 15px 15px 15px;
  display: flex;
  flex-direction: column;
  gap: 1px;

  @media only screen and (max-width: 425px) {
    padding: 0 10px 10px 10px;
    gap: 1px;
    line-height: 0.2pt;
  }
`;
export const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  @media only screen and (max-width: 425px) {
    padding-top: 10px;
  }
`;
export const Contents = styled.div`
 margin: 0;

  @media only screen and (max-width: 425px) {
    padding-bottom: 0;
  }
`;
export const Price = styled.div`
  background-color: lightgreen;
  border-radius: 18px;
  max-width: 150px;
  min-width: 100px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 425px) {
    max-width: 100px;
    padding: 10px;
  }
`;
export const Star = styled(StarIcon)`
  color: orange;
  margin-right: 5px;
`;

export const Text = styled.p`
  line-height: 15pt;
  text-align: justify;
  text-justify: inter-word;
  font-size: 15px;
  letter-spacing: 0.5px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;

  @media only screen and (max-width: 425px) {
    font-size: 12px;
    line-height: 12pt;
  }
`;

export const PriceTag = styled.span`
  font-size: 15px;
  color: green;
  padding: 5px;

  @media only screen and (max-width: 425px) {
    font-size: 12px;
    padding: 0;
  }
`;

export const Rate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;

  @media only screen and (max-width: 425px) {
    font-size: 12px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
`;

export const Review = styled.p`
  color: gray;

  @media only screen and (max-width: 425px) {
    font-size: 12px;
  }
`;
