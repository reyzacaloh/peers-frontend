import React from "react";
import {
  Wrapper,
  Image,
  Card,
  Contents,
  Description,
  ImageContainer,
  Price,
  Rating,
  Star,
  Text,
  PriceTag,
  Rate,
  Review,
  Name,
  University,
  Subject,
  SubSpan
} from "./tutorStyledComponents";
import { currencyFormat } from "../../utils/common";

const TutorCard = ({ onClick, data }) => {
  const {
    firstname,
    university,
    profile_picture,
    descriptions,
    price_per_hour,
    review_count,
    rating,
    subject,
  } = data || {};
  
  return (
    <Card onClick={onClick} data-testid="tutor_card">
      <ImageContainer>
        <Wrapper>
          <Name>{firstname}</Name>
          <University>{university}</University>
        </Wrapper>
        <Image src={profile_picture} />
      </ImageContainer>
      <Description>
        <Rating>
          <Rate>
            <Star />
            <p style={{ fontWeight: "bold" }}>{rating}</p>
          </Rate>
          <Review>({review_count} ulasan)</Review>
        </Rating>
        <Contents>
          <Text>{descriptions || "No Descriptions"}</Text>
        </Contents>
        <Subject>
          <SubSpan>{subject}</SubSpan>
        </Subject>
        <Price>
          <PriceTag>{currencyFormat(price_per_hour)}/jam</PriceTag>
        </Price>
      </Description>
    </Card>
  );
};

export default TutorCard;
