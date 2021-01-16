import React from "react";
import styled from "styled-components";

const ImgBox = styled.div`
  flex: 1 1 0%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Background = () => {
  return (
    <ImgBox>
      <img alt="배경" src="/bg.png" />
    </ImgBox>
  );
};

export default Background;
