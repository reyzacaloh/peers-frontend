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
  padding: 0 5px 40px 10px;
  line-height: 0.1pt;
  flex-direction: column;
  justify-content: space-evenly;
  color: white;
  width: 100%;
  overflow: hidden;
  top: 70%;
  z-index: 999;
  left: 0;
  
`;

export const Name = styled.h3`
 text-align: left;
`

export const University = styled.p`
  text-align: left;
`

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
`;

export const Description = styled.div`
  flex: 1;
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  line-height: 1pt;
  gap: 2px;
`;
export const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
`;
export const Contents = styled.div`
  padding-bottom: 10px;
  padding-top: 0;
`;
export const Price = styled.div`
  background-color: lightgreen;
  border-radius: 18px;
  max-width: 150px;
  min-width: 100px;
  padding: 10px 5px 10px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

export const PriceTag = styled.span`
  font-size: 15px;
  color: green;
  padding: 5px;
`;

export const Rate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 5px;
`;

export const Review = styled.p`
  color: gray;
`;

