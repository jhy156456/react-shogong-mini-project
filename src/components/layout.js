import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const AppLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Layout = ({ children }) => {
  return <AppLayout>{children}</AppLayout>;
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
