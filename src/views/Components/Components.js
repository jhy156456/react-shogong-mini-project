import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import { Query } from "react-apollo";
import { LOGIN_QUERY } from "lib/api/user.js";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import SectionBasics from "./Sections/SectionBasics.js";

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

export default function Components(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <React.Fragment>
      <Parallax small filter image={require("assets/img/bg5.png")}>
        {/* <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
                <h1 className={classes.title}>Material Kit React.</h1>
                <h3 className={classes.subtitle}>
                  A Badass Material-UI Kit based on Material Design.
                </h3>
              </div>
            </GridItem>
          </GridContainer>
        </div> */}
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <Query
          query={LOGIN_QUERY}
          variables={{
            username: "shogong",
            password: "tyrhddmltnghwk",
          }}
        >
          {({ data, loading }) =>
            loading ? (
              <p>불러오는중..</p>
            ) : (
              <div>
                {(function () {
                  sessionStorage.setItem(
                    "access_token",
                    data.userCheck.access_token
                  );
                  return <SectionBasics />;
                })()}
              </div>
            )
          }
        </Query>
      </div>
    </React.Fragment>
  );
}
