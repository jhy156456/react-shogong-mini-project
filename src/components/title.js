import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: ${props => props.marginBottom};

  @media screen and (max-width: 596px) {
    margin-bottom: 1rem;
  }
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: auto;

  span {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -2px;
  }

  @media screen and (max-width: 596px) {
    span {
      font-size: 1.5rem;
    }
  }
`;

const Title = ({ marginBottom, text }) => {
  return (
    <HeaderTitle marginBottom={marginBottom}>
      <LogoBox>
        <span>{text}</span>
      </LogoBox>
    </HeaderTitle>
  );
};

Title.propTypes = {
  marginBottom: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Title;
