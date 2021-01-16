import React from "react";
import styled from "styled-components";

import { Button } from "@material-ui/core";

const BasicButton = styled(Button)`
  @media screen and (max-width: 596px) {
    margin: 0.5em 0.25em 0 0 !important;
    width: 100% !important;
    font-size: 75% !important;
    word-break: keep-all !important;

    &:last-child {
      margin-right: 0 !important;
    }
  }
`;

const BasicBtn = ({ children, style, color, ...props }) => {
  const styles = style ? style : { backgroundColor: "#5E94E4", color: "#fff" };

  return (
    <BasicButton style={color ? undefined : styles} color={color} {...props}>
      {children}
    </BasicButton>
  );
};

export default BasicBtn;
