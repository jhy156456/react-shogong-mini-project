import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
//import Card from "@material-ui/core/Card";
import Card from "components/Card/Card.js";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { Box, Grid } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Link } from "react-router-dom";
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
    width: 220,
    height: "100%",
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
  },
}));

export default function MediaControlCard(props) {
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
          <Grid item>
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography variant="body1" style={{ fontWeight: "bold" }}>
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
          <Grid item>
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
