import React, {useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
//@material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Typography, CircularProgress, Grid} from "@material-ui/core";
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
import {USER_INFO_QUERY} from "lib/api/user.js";
import {useParams} from "react-router-dom";
//image
import kakaoImage from "assets/img/kakao.png";
import callImage from "assets/img/call.png";
import locationImage from "assets/img/location.png";
import content1 from "assets/img/content1.jpg";
import content2 from "assets/img/content2.png";
import content3 from "assets/img/content3.png";
import content4 from "assets/img/content4.png";
import content5 from "assets/img/content5.png";

const useStyles = makeStyles((theme) => ({
    ...styles,
    headerStye: {
        color: "white",
        // study jhy "@media (min-width: 576px)": {   maxWidth: "540px" },BasicBtn min
        // width : 최소 width 가 0px이상인 경우에 적용된다 -> 전체 max width : 최대 width 가 767px이하인 경우에
        // 적용된다
        "@media (min-width: 0px)": {
            fontSize: "1rem"
        },
        "@media (min-width: 768px)": {
            fontSize: "1.5rem"
        }
    },
    headerDetailStyle: {
        "@media (min-width: 0px)": {
            fontSize: "0.8rem"
        },
        "@media (min-width: 768px)": {
            fontSize: "1rem"
        }
    },
    borderStyle: {
        "@media (max-width: 767px)": {
            height: "5px"
        },
        marginLeft: "-15px",
        marginRight: "-15px"
    }
}));

export default function FactoryDetailPage(props) {
    useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 576px)");
        mediaQuery.addListener(setMQuery);
        // this is the cleanup function to remove the listener
        return() => mediaQuery.removeListener(setMQuery);
    }, []);

    const [mQuery, setMQuery] = React.useState({
        matches: window.innerWidth > 576
            ? true
            : false
    });

    const classes = useStyles();
    const {id} = useParams();

    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);

    const loading = false;
    const error = false;
    if (loading || error) 
        return <CircularProgress/>;
    
    // console.log(data);

    return (
        <React.Fragment>
            <Parallax small="small" filter="filter" image={require("assets/img/main-image.jpg")} className={classes.container}
                // style={{ backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}
            ></Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                {
                    loading
                        ? (<CircularProgress/>)
                        : (
                            <div className={classes.container}>

                                <div
                                    style={{
                                        paddingTop: '10px'
                                    }}>
                                    <Grid container="container" justify="center" alignItems="center">
                                        <GridItem xs={3} sm={3} md={3}>
                                            <a href='tel:010-2813-4600'><img src={callImage} className={classes.imgFluid}/></a>
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <img src={kakaoImage} className={classes.imgFluid}/>
                                        </GridItem>
                                        <GridItem xs={3} sm={3} md={3}>
                                            <a
                                                href="https://map.naver.com/v5/directions/-/14149497.102744166,4490411.988490414,%EA%B2%BD%EA%B8%B0%EB%8F%84%20%EC%84%B1%EB%82%A8%EC%8B%9C%20%EB%B6%84%EB%8B%B9%EA%B5%AC%20%EC%84%B1%EB%82%A8%EB%8C%80%EB%A1%9C343%EB%B2%88%EA%B8%B8%2010-6,,/-/car?c=14149497.1027442,4490411.9884904,15,0,0,0,dh">
                                                <img src={locationImage} className={classes.imgFluid}/>
                                            </a>
                                        </GridItem>

                                    </Grid>
                                    <Typography align="center" className={classes.h3Style}>24시 연중무휴 상담가능
                                    </Typography>
                                </div>

                                <Box mb={3}/>
                                <Divider variant="fullWidth" className={classes.borderStyle}/>
                                <Box mb={3}/>

                                <GridContainer justify="center">
                                    <img src={content1} className={classes.imgFluid}/>
                                </GridContainer>

                                <Box mb={3}/>
                                <Divider variant="fullWidth" className={classes.borderStyle}/>
                                <Box mb={3}/>

                                <GridContainer justify="center">
                                    <img src={content2} className={classes.imgFluid}/>
                                </GridContainer>

                                <Box mb={3}/>
                                <Divider variant="fullWidth" className={classes.borderStyle}/>
                                <Box mb={3}/>

                                <GridContainer justify="center">
                                    <img src={content3} className={classes.imgFluid}/>
                                </GridContainer>
                                <Box mb={3}/>
                                <Divider variant="fullWidth" className={classes.borderStyle}/>
                                <Box mb={3}/>

                                <GridContainer justify="center">
                                    <img src={content4} className={classes.imgFluid}/>
                                </GridContainer>

                                <Box mb={3}/>
                                <Divider variant="fullWidth" className={classes.borderStyle}/>
                                <Box mb={3}/>

                                <GridContainer justify="center">
                                    <img src={content5} className={classes.imgFluid}/>
                                </GridContainer>

                                <Box mb={3}/>

                                <Divider
                                    variant="fullWidth"
                                    className={classes.borderStyle}
                                    style={{
                                        marginTop: "30px"
                                    }}/>

                            </div>
                        )
                }

            </div>
        </React.Fragment>
    );
}
