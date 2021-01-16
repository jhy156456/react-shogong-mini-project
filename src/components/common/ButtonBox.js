import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: ${props => (props.justify ? props.justify : "flex-end")};
  margin-bottom: ${props => props?.margin?.bottom};
  margin-top: ${props => props?.margin?.top};
  float: ${props => props.float};

  .btn {
    height: 40px;
  }

  @media screen and (max-width: 596px) {
    width: 100%;
  }
`;

const ButtonBox = ({ children, ...props }) => <Wrapper {...props}>{children}</Wrapper>;

ButtonBox.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.any,
};

export default ButtonBox;
