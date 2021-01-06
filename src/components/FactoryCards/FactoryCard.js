import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// @material-ui/core components
import {
  CardContent,
  Typography,
  IconButton,
  CardMedia,
  Box,
  Grid,
  CardActionArea,
} from "@material-ui/core";
//custom components
import Card from "components/Card/Card.js";
//react components
import { Link } from "react-router-dom";
//@material-ui/icons
import {
  SkipPreviousIcon,
  PlayArrowIcon,
  SkipNextIcon,
} from "@material-ui/icons/SkipPrevious";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    height: "100%",
    borderRadius: "6px !important",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  h6Style: {
    fontSize: "0.7rem",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
export default function MediaControlCard(props) {
  const { post } = props;
  const classes = useStyles();
  const theme = useTheme();
  return (
    <CardActionArea component="div">
      <Card className={classes.root}>
        <Link
          underline="none"
          to={`/store/${props.post.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Grid container justify={"space-between"}>
            <Grid item xs={6}>
              <div className={classes.details}>
                <CardContent
                  className={classes.content}
                  style={{ paddingBottom: "16px" }}
                >
                  <Typography
                    variant="body1"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    제조사명
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.h6Style}
                  >
                    주소
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.h6Style}
                  >
                    사업분야
                  </Typography>
                  <Box mb={2} />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.h6Style}
                  >
                    사업형태
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.h6Style}
                  >
                    작업원단
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.h6Style}
                  >
                    생산품목
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.h6Style}
                  >
                    최소주문수량n개
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    className={classes.h6Style}
                  >
                    쇼공 자체제품 판매 제조사
                  </Typography>
                </CardContent>
              </div>
            </Grid>
            <Grid item xs={6}>
              <CardMedia
                className={classes.cover}
                component="img"
                image="/static/images/grid-list/mushroom.jpg"
                title="Live from space album cover"
              />
            </Grid>
          </Grid>
        </Link>
      </Card>
    </CardActionArea>
  );
}
