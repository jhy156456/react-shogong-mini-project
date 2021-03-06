import { container, title,sameContainer } from "assets/jss/material-kit-react.js";

import imagesStyle from "assets/jss/material-kit-react/imagesStyles.js";

const factoryDetailPage = {
  sameContainer,
  container,
  profile: {
    // textAlign: "center",
    // "& img": {
    //   maxWidth: "400px",
    //   height:'200px',
    //   width: "100%",
    //   margin: "0 auto",
    //   transform: "translate3d(0, -50%, 0)"
    // }
  },
  description: {
    margin: "1.071rem auto 0",
    maxWidth: "600px",
    color: "#999",
    textAlign: "center !important"
  },
  content: {
    padding : "3rem",
    
    // marginTop: "-80px"
  },
  ...imagesStyle,
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    // margin: "-15px 0px", edit JHY
    margin: "-10px 0",
    borderRadius: "15px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none"
  },
  socials: {
    marginTop: "0",
    width: "100%",
    transform: "none",
    left: "0",
    top: "0",
    height: "100%",
    lineHeight: "41px",
    fontSize: "20px",
    color: "#999"
  },
  navWrapper: {
    margin: "20px auto 20px auto",
    textAlign: "center"
  },
  h3Style:{
    fontSize : "1rem",
    fontWeight: "bold",
  },
  
};

export default factoryDetailPage;
