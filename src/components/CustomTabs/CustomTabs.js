import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import { Link } from "react-router-dom";
import styles from "assets/jss/material-kit-react/components/customTabsStyle.js";
import CardActionArea from "@material-ui/core/CardActionArea";
import Box from "@material-ui/core/Box"
const useStyles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  paper2: {
    padding: theme.spacing(0.5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cardTitle: {
    float: "left",
    padding: "10px 10px 10px 0px",
    lineHeight: "24px",
  },
  cardTitleRTL: {
    float: "right",
    padding: "10px 0px 10px 10px !important",
  },
  displayNone: {
    display: "none !important",
  },
  tabsRoot: {
    minHeight: "unset !important",
  },
  tabRootButton: {
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    padding: "10px 15px",
    borderRadius: "3px",
    lineHeight: "24px",
    border: "0 !important",
    color: "#fff !important",
    marginLeft: "4px",
    fontWeight: "500",
    fontSize: "12px",
    "&:last-child": {
      marginLeft: "0px",
    },
  },
  tabSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transition: "0.2s background-color 0.1s",
  },
  tabWrapper: {
    display: "inline-block",
    minHeight: "unset !important",
    minWidth: "unset !important",
    width: "unset !important",
    height: "unset !important",
    maxWidth: "unset !important",
    maxHeight: "unset !important",
    "& > svg": {
      verticalAlign: "middle",
      margin: "-1.55px 5px 0 0 !important",
    },
    "&,& *": {
      letterSpacing: "normal !important",
    },
  },
  h6Style:{
    fontSize:'0.7rem'
  }
}));

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, value) => {
    setValue(value);
  };
  const classes = useStyles();
  const { headerColor, plainTabs, tabs, title, rtlActive } = props;
  const { business } = props.post;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive,
  });
  return (
    <CardActionArea component="div">
      <Link
        underline="none"
        to={`/store/${props.post.id}`}
        style={{ textDecoration: "none", color: "white" }}
      >
        <Card plain={plainTabs} >
          <CardHeader  plain={plainTabs}>
            <Grid container justify="space-around" noWrap>
              <Grid item xs={4} sm={3} md={3}>
                <Typography align="center" variant="body1" style={{fontWeight:'bold'}} align="left">
                  {business.license_name}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3} md={3} style={{ margin: "auto" }} >
                <Typography variant="h6" className={classes.h6Style}> 원단공장</Typography>
              </Grid>
              <Grid item xs={3} sm={3} md={3}>
                <FavoriteBorderIcon style={{ float: "right" }} />
              </Grid>
            </Grid>
          </CardHeader>
          <Box className={classes.paper2} border={1}>안녕하세요페이퍼에요</Box>
          <CardBody>
            <Grid container justify="space-around" className={classes.paper}>
              <Grid item xs={3} sm={4} md={3}>
                <Typography variant="h6" className={classes.h6Style}>주요 생산 품목</Typography>
              </Grid>
              <Grid item xs={3} sm={4} md={3}>
                <Typography variant="h6"className={classes.h6Style}>카테고리</Typography>
              </Grid>
              <Grid item xs={3} sm={4} md={3}>
                <Typography variant="h6"className={classes.h6Style}>주요 생산 품목</Typography>
              </Grid>
            </Grid>
            <Grid container justify="space-around" className={classes.paper}>
              <Grid item xs={3} sm={4} md={3}>
                <Typography variant="h6"className={classes.h6Style}>주소</Typography>
              </Grid>
              <Grid item xs={3} sm={4} md={3}>
                <Typography variant="h6"className={classes.h6Style}>최소생산수량</Typography>
              </Grid>
              <Grid item xs={3} sm={4} md={3}>
                <Typography variant="h6"className={classes.h6Style}>규모</Typography>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </Link>
    </CardActionArea>
  );
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
};
