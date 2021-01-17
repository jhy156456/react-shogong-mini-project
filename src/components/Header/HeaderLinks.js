/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>

      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="더보기"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            // <Link to="/" className={classes.dropdownLink}>
            //   All components
            // </Link>,
            <a
            href="https://www.shogong.com/main/index.php"
            target="_blank"
            className={classes.dropdownLink}
          >
            판매홈
          </a>,
            <a
              href="http://manage.shogong.com/"
              target="_blank"
              className={classes.dropdownLink}
            >
              입점플랫폼
            </a>
          ]}
        />
      </ListItem> */}
      <ListItem className={classes.listItem}>
      <Button
            color="transparent"
            href="http://localhost:3000/login"
            className={classes.navLink}
          >
            <h6>로그인</h6>
            {/* <i className={classes.socialIcons + " fab fa-instagram"} /> */}
          </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        {/* <Tooltip
          id="instagram-tooltip"
          title="쇼공 인스타그램"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        > */}
          <Button
            color="transparent"
            href="http://localhost:3000/signin"
            className={classes.navLink}
          >
            <h6>회원가입</h6>
            {/* <i className={classes.socialIcons + " fab fa-instagram"} /> */}
          </Button>
        {/* </Tooltip> */}
      </ListItem>
    </List>
  );
}
