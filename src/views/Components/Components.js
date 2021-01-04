import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { useQuery } from "@apollo/client";
import { LOGIN_QUERY } from "lib/api/user.js";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import MainPage from "./Sections/MainPage.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;


  // const { loading, error, data, fetchMore } = useQuery(LOGIN_QUERY, {
  //   variables: {
  //     username: process.env.REACT_APP_ID,
  //     password: process.env.REACT_APP_PW,
  //   },
  // });

  return (
    <React.Fragment>
      <Parallax small filter image={require("assets/img/bg5.png")} className={classes.sameContainer}></Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        {/* {loading ? (
          <p>불러오는중..</p>
        ) : (
          <div>
            {(function () {
              sessionStorage.setItem(
                "access_token",
                data.userCheck.access_token
              );
              return ;
            })()}
          </div>
        )} */}
        <MainPage />
      </div>
    </React.Fragment>
  );
}
