import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
//@material-ui/icons
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
//core components
import SectionCarousel from "components/Sections/SectionCarousel.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
//style
import styles from "assets/jss/material-kit-react/views/profilePage.js";
//graphql
import { USER_INFO_QUERY } from "lib/api/user.js";
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";
import { useQuery } from "@apollo/client";
import "./hi.css";

import work1 from "assets/img/examples/olu-eletu.jpg";
import SinglineGridList from "./SingleLineGridList";
import Comments from "components/comment/Comments";

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
  const { loading, error, data, fetchMore } = useQuery(USER_INFO_QUERY, {
    variables: {
      user_id: id,
      business: true,
      deliver: true,
    },
  });
  if (loading) return <CircularProgress />;
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid,
    classes.imgRounded
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  console.log(data);
  const myStyles = {
    paperContainer: {
      backgroundImage: `url(${work1})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "100% 100%",
    },
  };
  return (
    <React.Fragment>
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div
        className={classNames(classes.main, classes.mainRaised)}
        style={{ paddingTop: "30px" }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.container}>
            <GridContainer>
              <GridItem>
                {/* <div>
                    <img src={work1} alt="..." className={imageClasses} />
                  </div> */}
                <div style={myStyles.paperContainer}>
                  <div className={classes.content}>
                    <GridContainer justify="flex-start" spacing={2}>
                      <GridItem>
                        <Typography color="textPrimary" variant="h4">
                          <Box fontWeight="fontWeightBold" mb={1}>
                            {data.userInfo.business.license_name}
                          </Box>
                        </Typography>
                      </GridItem>
                    </GridContainer>

                    <Box mb={1}>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                        style={{ wordBreak: "keep-all" }}
                      >
                        {data.userInfo.business.factory_address.address}
                      </Typography>
                    </Box>

                    <Box mb={3}>
                      <GridContainer justify="flex-start" spacing={2}>
                        <GridItem className={classes.statsItem}>
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
                        </GridItem>
                        <GridItem className={classes.statsItem}>
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
                        </GridItem>
                      </GridContainer>
                    </Box>

                    <Button
                      variant="outlined"
                      size="md"
                      color="primary"
                      className={classes.margin}
                    >
                      연락처확인
                    </Button>

                    <Box mb={1} />
                    <Typography
                      color="textPrimary"
                      variant="body1"
                      style={{ wordBreak: "keep-all" }}
                    >
                      해당 제조사는 쇼공에서 자체상품을 판매하고 있는
                      제조사입니다.
                    </Typography>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <Box mb={3} />
            <Divider />

            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.title}>
                  <h4 className={classes.h3Style}>업체소개</h4>
                </div>
                <Typography variant="body2">
                  산호는 직기 토탈 임가공 전문업체입니다.정장류를 포함한 다양한
                  직기아이템이 가능하며 남방,블라우스,원피스,바지가 메인
                  아이템입니다. 거래처가 원하는 납기싯점 관리를 중요하게
                  생각하며 검품을 통한 품질관리가 이루어지는 업체입니다
                </Typography>
                <Typography variant="body2">직접생산</Typography>
              </GridItem>
            </GridContainer>
            <Box mb={3} />
            <Divider variant="fullWidth" />

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
                  <h4 className={classes.h3Style}>주요 생산 카테고리</h4>
                </div>
                <Typography variant="body2">직접생산</Typography>
                <div className={classes.title}>
                  <h4 className={classes.h3Style}>주요 생산 품목</h4>
                </div>
                <Typography variant="body2">직접생산</Typography>
              </GridItem>
            </GridContainer>
            <Box mb={3} />
            <Divider variant="fullWidth" />

            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.title}>
                  <h4 className={classes.h3Style}>최소 주문 수량(MOQ)</h4>
                </div>
                <Typography variant="body2">100개</Typography>
                <div className={classes.title}>
                  <h4 className={classes.h3Style}>근로자수</h4>
                </div>
                <Typography variant="body2">20명</Typography>
                <div className={classes.title}>
                  <h4 className={classes.h3Style}>사용 가능 설비</h4>
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
                <Typography variant="body2">구찌 샤넬 버버리</Typography>
              </GridItem>
            </GridContainer>
            <Divider variant="fullWidth" />

            {mQuery && !mQuery.matches ? (
              <>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.navWrapper}
                  >
                    <SinglineGridList
                      itemClass={navImageClasses}
                    ></SinglineGridList>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem
                    xs={12}
                    sm={12}
                    md={12}
                    className={classes.navWrapper}
                  >
                    <SinglineGridList
                      itemClass={navImageClasses}
                    ></SinglineGridList>
                  </GridItem>
                </GridContainer>
              </>
            ) : (
              <>
                <div className={classes.title}>
                  <h4 className={classes.h3Style}>제조공장 사진</h4>
                </div>
                <SectionCarousel />

                <div className={classes.title}>
                  <h4 className={classes.h3Style}>샘플사진</h4>
                </div>
                <SectionCarousel />
              </>
            )}
            <Divider variant="fullWidth" />
            <div className={classes.title}>
              <h4 className={classes.h3Style}>거래후기</h4>
            </div>
            <Comments />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
