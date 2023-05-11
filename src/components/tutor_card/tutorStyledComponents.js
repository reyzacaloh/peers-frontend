import styled from "styled-components";
import StarIcon from "@mui/icons-material/Star";

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
export const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: rgba(156, 156, 156, 0.65);
  color: white;
  width: 100%;
  bottom: 0;
  z-index: 0;
  padding: 0 10px 10px 20px;

  @media only screen and (max-width: 785px) {
    padding: 0 5px 5px 10px;
  }
`;

export const Name = styled.h3`
  text-align: left;
  margin: 0;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media only screen and (max-width: 785px) {
    font-size: 12px;
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

  @media only screen and (max-width: 785px) {
    font-size: 10px;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  display: flex;
  flex-basis: 60%;
  flex-grow: 0;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 15px;
  overflow: hidden;
  ${Image} {
    transition: transform 0s ease;
  }
  ${Wrapper} {
    transition: transform 1s ease;
  }

  @media only screen and (max-width: 785px) {
    border-radius: 5px;
    flex-basis: 50%;
  }
`;

export const Text = styled.p`
  line-height: 15pt;
  text-align: justify;
  text-justify: inter-word;
  font-size: 15px;
  letter-spacing: 0.5px;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  @media only screen and (max-width: 785px) {
    font-size: 10px;
    -webkit-line-clamp: 4;
    line-height: 10pt;
  }
`;

export const Card = styled.div`
  display: flex;
  flex-basis: auto
  cursor: pointer;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  border-radius: 30px;
  margin: 0;
  height: 450px;
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
      ${Wrapper}{
        z-index: 999;
      }
    }
  }

  @media only screen and (max-width: 785px) {
    min-width: 175px;
    max-width: 175px;
    border-radius: 10px;
    height: 280px;
  }

  @media only screen and (max-width: 1024px) and (min-width: 786px) {
    min-width: 240px;
    max-width: 240px;
  }
`;

export const Description = styled.div`
  flex-basis: 40%;
  flex-grow: 0;
  flex-shrink: 0;
  padding: 0 15px 15px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1px;
  justify-content: space-between;

  ${Text} {
    align-self: flex-start;
    align-content: flex-start;
  }
  @media only screen and (max-width: 785px) {
    padding: 0 10px 10px 10px;
    flex-basis: 50%;
  }
`;
export const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  @media only screen and (max-width: 785px) {
    font-size: 10px;
  }
`;
export const Contents = styled.div`
  margin: 0;
  padding-bottom: 5px;
  @media only screen and (max-width: 785px) {
    padding-bottom: 0;
  }
`;
export const Price = styled.div`
  background-color: lightgreen;
  border-radius: 18px;
  max-width: 220px;
  min-width: 100px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 785px) {
    border-radius: 15px;
    height: 20px;
    max-width: 100vw;
  }
`;

export const Subject = styled.div`
  background-color: #6699ff;
  border-radius: 18px;
  max-width: 220px;
  min-width: 100px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 785px) {
    border-radius: 15px;
    height: 20px;
    max-width: 100vw;
  }
`;

export const Star = styled(StarIcon)`
  color: orange;
  margin-right: 5px;

  @media only screen and (max-width: 785px) {
    margin-right: 2px;
    padding: 3px;
  }
`;

export const PriceTag = styled.span`
  font-size: 15px;
  color: green;
  padding: 5px;

  @media only screen and (max-width: 785px) {
    font-size: 10px;
    padding: 0;
  }
`;

export const SubSpan = styled.span`
  font-size: 15px;
  color: white;
  padding: 5px;

  @media only screen and (max-width: 785px) {
    font-size: 10px;
    padding: 0;
  }
`;

export const Rate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;

  @media only screen and (max-width: 785px) {
    font-size: 12px;
    align-items: center;
    justify-content: center;
    flex-direction: row;
  }
`;

export const Review = styled.p`
  color: gray;

  @media only screen and (max-width: 785px) {
    font-size: 12px;
  }
`;
