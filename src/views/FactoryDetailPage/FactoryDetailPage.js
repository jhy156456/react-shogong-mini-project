import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import muiButton from "@material-ui/core/Button";
//@material-ui/icons
import {
  ChatBubbleOutlineIcon,
  PhoneIcon,
  FavoriteBorderIcon,
} from "@material-ui/icons";
//custom components
import SectionCarousel from "components/Sections/SectionCarousel.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import SinglineGridList from "./SingleLineGridList";
import Comments from "components/comment/Comments";
//style
import styles from "assets/jss/material-kit-react/views/factoryDetailPage.js";
//graphql
import { USER_INFO_QUERY } from "lib/api/user.js";
import { useParams } from "react-router-dom";
import { Query } from "react-apollo";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles((theme) => ({
  ...styles,
  headerStye: {
    color: "white",
    //min width : 최소 width 가 0px이상인 경우에 적용된다
    //max width : 최대 width 가 767px이하인 경우에 적용된다
    "@media (min-width: 0px)": {
      fontSize: "1rem",
    },
    "@media (min-width: 768px)": {
      fontSize: "1.5rem",
    },
  },
  headerDetailStyle: {
    "@media (min-width: 0px)": {
      fontSize: "0.8rem",
    },
    "@media (min-width: 768px)": {
      fontSize: "1rem",
    },
  },
  borderStyle: {
    "@media (max-width: 767px)": {
      height: "5px",
    },
    marginLeft: "-15px",
    marginRight: "-15px",
  },
}));

export default function FactoryDetailPage(props) {
  const [mQuery, setMQuery] = React.useState({
    matches: window.innerWidth > 576 ? true : false,
  });
  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 576px)");
    mediaQuery.addListener(setMQuery);
    // this is the cleanup function to remove the listener
    return () => mediaQuery.removeListener(setMQuery);
  }, []);

  const classes = useStyles();
  const { id } = useParams();
  // const { loading, error, data, fetchMore } = useQuery(USER_INFO_QUERY, {
  //   variables: {
  //     user_id: id,
  //     business: true,
  //     deliver: true,
  //   },
  // });
  // if (loading) return <CircularProgress />;
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid,
    classes.imgRounded
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const data = JSON.parse(
    '{"userInfo":{"__typename":"User","username":"overcam","manager":"박윤범","position":"대표","contact":"010-7112-6340","email":"yb@shogong.com","deliver":null,"business":{"__typename":"BusinessInfo","representative":"박윤범","license_name":"쇼공","license_number":"350-88-01464","tax_email":"yb@shogong.com","started":"2019-06-01","description":"공장 직거래 플랫폼을 서비스하고 있습니다.","profile_link":"","license_link":"https://shogong-management.s3.ap-northeast-2.amazonaws.com/overcam/사업자 등록증.pdf","account_link":"https://shogong-management.s3.ap-northeast-2.amazonaws.com/overcam/통장 사본.pdf","client":{"__typename":"Client","client_1":"쇼공1","client_2":"쇼공2","client_3":"쇼공3","client_4":"4","client_5":"5"},"client_types":[{"__typename":"Data","id":"2"},{"__typename":"Data","id":"4"}],"main_businesses":[{"__typename":"Data","id":"1"},{"__typename":"Data","id":"2"}],"factory_address":{"__typename":"Address","address":"서울특별시 강남구 도산대로55길 37 (청담동)","detail":"4층"},"license_address":{"__typename":"Address","address":"서울특별시 강남구 도산대로55길 37 (청담동)","detail":"4층"}}}}'
  );
  console.log(data);

  return (
    <React.Fragment>
      <Parallax
        small
        filter
        image={require("assets/img/main-image.jpg")}
        className={classes.container}
        style={{ backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}
      >
        <GridContainer
          style={{
            position: "absolute",
            bottom: "0",
            zIndex: "1",
            marginBottom: "20px",
          }}
          xs={12}
        >
          <GridItem>
            <Typography color="textPrimary" variant="h6">
              <Box
                fontWeight="fontWeightBold"
                mb={1}
                className={classes.headerStye}
              >
                {data.userInfo.business.license_name}
              </Box>
            </Typography>
            <Typography
              color="textPrimary"
              variant="body1"
              style={{ wordBreak: "keep-all", color: "white" }}
              className={classes.headerDetailStyle}
            >
              {data.userInfo.business.factory_address.address}
            </Typography>

            <Box>
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
                style={{ verticalAlign: "middle", color: "white" }}
                className={classes.headerDetailStyle}
              >
                연락처 조회수 1
              </Typography>
              <Typography
                color="textSecondary"
                display="inline"
                variant="body2"
                style={{
                  verticalAlign: "middle",
                  color: "white",
                  marginLeft: "10px",
                }}
                className={classes.headerDetailStyle}
              >
                거래후기 3
              </Typography>
            </Box>

            <Button
              variant="outlined"
              size="md"
              color="primary"
              className={classes.margin}
            >
              연락처확인
            </Button>
            <Typography
              color="textPrimary"
              variant="body1"
              style={{ wordBreak: "keep-all", color: "white" }}
              className={classes.headerDetailStyle}
            >
              해당 제조사는 쇼공에서 자체상품을 판매하고 있는 제조사입니다.
            </Typography>
          </GridItem>
        </GridContainer>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        {/* {loading ? (
          <CircularProgress />
        ) : (
         
        )} */}
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div className={classes.title}>
                <h4 className={classes.h3Style}>업체소개</h4>
              </div>
              <Typography variant="body2">
                산호는 직기 토탈 임가공 전문업체입니다.정장류를 포함한 다양한
                직기아이템이 가능하며 남방,블라우스,원피스,바지가 메인
                아이템입니다. 거래처가 원하는 납기싯점 관리를 중요하게 생각하며
                검품을 통한 품질관리가 이루어지는 업체입니다
              </Typography>
              <Typography variant="body2">직접생산</Typography>
            </GridItem>
          </GridContainer>
          <Box mb={3} />
          <Divider variant="fullWidth" className={classes.borderStyle} />

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
          <Divider variant="fullWidth" className={classes.borderStyle} />

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
              <Typography variant="body2">직접생산 디자인 프로모션</Typography>
              <div className={classes.title}>
                <h4 className={classes.h3Style}>거래처명</h4>
              </div>
              <Typography variant="body2">구찌 샤넬 버버리</Typography>
            </GridItem>
          </GridContainer>
          <Box mb={3} />
          <Divider variant="fullWidth" className={classes.borderStyle} />

          {mQuery && !mQuery.matches ? (
            <>
              <div className={classes.title}>
                <h4 className={classes.h3Style}>제조공장 사진</h4>
              </div>
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
              <div className={classes.title}>
                <h4 className={classes.h3Style}>샘플사진</h4>
              </div>
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
          <Divider
            variant="fullWidth"
            className={classes.borderStyle}
            style={{ marginTop: "30px" }}
          />
          <div className={classes.title}>
            <h4 className={classes.h3Style}>거래후기</h4>
          </div>
          <Comments />
        </div>
      </div>
    </React.Fragment>
  );
}
