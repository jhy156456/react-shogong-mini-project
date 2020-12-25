import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import SectionCarousel from "components/Sections/SectionCarousel.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/logo.png";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { USER_INFO_QUERY } from "lib/api/user.js";
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";
import "./hi.css";

import studio1 from "assets/img/examples/studio-1.jpg";
import studio2 from "assets/img/examples/studio-2.jpg";
import studio3 from "assets/img/examples/studio-3.jpg";
import studio4 from "assets/img/examples/studio-4.jpg";
import studio5 from "assets/img/examples/studio-5.jpg";
import work1 from "assets/img/examples/olu-eletu.jpg";
import work2 from "assets/img/examples/clem-onojeghuo.jpg";
import work3 from "assets/img/examples/cynthia-del-rio.jpg";
import work4 from "assets/img/examples/mariya-georgieva.jpg";
import work5 from "assets/img/examples/clem-onojegaw.jpg";
import SinglineGridList from "./SingleLineGridList";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const [mQuery, setMQuery] = React.useState({
    matches: window.innerWidth > 576 ? true : false,
  });
  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 576px)");
    mediaQuery.addListener(setMQuery);
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeListener(setMQuery);
  }, []);
  // MediaQueryListEvent { isTrusted: true, media: "(min-width: 768px)", matches: true ...}

  const classes = useStyles();
  const { id } = useParams();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid,
    classes.imgRounded
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <Query
      query={USER_INFO_QUERY}
      variables={{
        user_id: id,
        business: true,
        deliver: true,
      }}
    >
      {({ data, loading }) =>
        loading ? (
          <p>불러오는중..</p>
        ) : (
          <div>
            {(function () {
              const userInfo = data.userInfo;
              return (
                <React.Fragment>
                  <Parallax
                    small
                    filter
                    image={require("assets/img/profile-bg.jpg")}
                  />
                  <div className={classNames(classes.main, classes.mainRaised)}>
                    <div>
                      <div className={classes.container}>
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.profile}>
                              <div>
                                <img
                                  src={profile}
                                  alt="..."
                                  className={imageClasses}
                                />
                              </div>
                              <div className={classes.name}>
                                <Grid container justify="center" spacing={2}>
                                  <Grid item>
                                    <Typography
                                      align="center"
                                      color="textPrimary"
                                      variant="h5"
                                    >
                                      <Box fontWeight="fontWeightBold" mb={1}>
                                        {userInfo.business.license_name}
                                      </Box>
                                    </Typography>
                                  </Grid>
                                  <Grid item>
                                    <FavoriteBorderIcon />
                                  </Grid>
                                </Grid>

                                <Box mb={1}>
                                  <Typography
                                    align="center"
                                    color="textPrimary"
                                    variant="body1"
                                  >
                                    {userInfo.deliver.address.address}
                                  </Typography>
                                </Box>

                                <Box mb={3}>
                                  <Grid container justify="center" spacing={2}>
                                    <Grid className={classes.statsItem} item>
                                      <PhoneIcon
                                        className={classes.verticalIcon}
                                        color="action"
                                        fontSize="inherit"
                                      />
                                      <Typography
                                        color="textSecondary"
                                        display="inline"
                                        variant="body2"
                                        style={{ verticalAlign: "middle" }}
                                      >
                                        연락처 조회수 1
                                      </Typography>
                                    </Grid>
                                    <Grid className={classes.statsItem} item>
                                      <ChatBubbleOutlineIcon
                                        className={classes.verticalIcon}
                                        color="action"
                                        fontSize="inherit"
                                      />
                                      <Typography
                                        color="textSecondary"
                                        display="inline"
                                        variant="body2"
                                        style={{ verticalAlign: "middle" }}
                                      >
                                        거래후기 3
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Box>

                                <Button
                                  variant="outlined"
                                  size="lg"
                                  color="primary"
                                  className={classes.margin}
                                >
                                  연락처확인
                                </Button>
                              </div>
                            </div>
                          </GridItem>
                        </GridContainer>
                        <Box mb={3} />
                        <Divider />

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>사업형태</h4>
                            </div>
                            <Typography variant="body2">직접생산</Typography>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>주요업무</h4>
                            </div>
                            <Typography variant="body2">직접생산</Typography>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>
                                주요 생산 카테고리
                              </h4>
                            </div>
                            <Typography variant="body2">직접생산</Typography>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>
                                주요 생산 품목
                              </h4>
                            </div>
                            <Typography variant="body2">직접생산</Typography>
                          </GridItem>
                        </GridContainer>
                        <Box mb={3} />
                        <Divider variant="middle" />

                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>
                                최소 주문 수량(MOQ)
                              </h4>
                            </div>
                            <Typography variant="body2">100개</Typography>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>근로자수</h4>
                            </div>
                            <Typography variant="body2">20명</Typography>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>
                                사용 가능 설비
                              </h4>
                            </div>
                            <Typography variant="body2">
                              나나인치 오버로크 슈퍼 워싱기 CAD
                            </Typography>
                          </GridItem>

                          <GridItem xs={12} sm={12} md={6}>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>거래처 분류</h4>
                            </div>
                            <Typography variant="body2">
                              직접생산 디자인 프로모션
                            </Typography>
                            <div className={classes.title}>
                              <h4 className={classes.h3Style}>거래처명</h4>
                            </div>
                            <Typography variant="body2">
                              구찌 샤넬 버버리
                            </Typography>
                          </GridItem>
                        </GridContainer>
                        <Box mb={3} />
                        <Divider variant="fullWidth" />

                        {mQuery && !mQuery.matches ? (
                          <GridContainer>
                            <GridItem
                              xs={12}
                              sm={12}
                              md={8}
                              className={classes.navWrapper}
                            >
                              <SinglineGridList
                                itemClass={navImageClasses}
                              ></SinglineGridList>
                            </GridItem>
                          </GridContainer>
                        ) : (
                          <SectionCarousel />
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })()}
          </div>
        )
      }
    </Query>
  );
}
