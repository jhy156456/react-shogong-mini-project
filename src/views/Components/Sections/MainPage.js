import React, { useState, useEffect, useCallback, useContext } from "react";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  Box,
  Chip,
  Grid,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
//@material-ui/icons components
import { Search, DoneIcon } from "@material-ui/icons";
//custom components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FactoryCards from "components/FactoryCards/FactoryCard.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import ChipListItem from "./ChipListItem";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//styles
import styles from "assets/jss/material-kit-react/views/componentsSections/mainPageStyle.js";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.js";
//gql
import { useQuery, useLazyQuery } from "@apollo/client";
import { LIST_STORES_QUERY } from "lib/api/posts.js";
//context API
import {
  SearchInputContextProvider,
  SearchInputConsumer,
} from "contexts/search.js";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  ...styles,
  ...headerLinksStyle,
  gutters: {
    paddingRight: "16px",
  },
}));
const seoul = [
  {
    value: "서울특별시",
    label: "서울특별시",
  },
  {
    value: "경기도",
    label: "경기도",
  },
  {
    value: "강원도",
    label: "강원도",
  },
];
const songpa = [
  {
    value: "송파구",
    label: "송파구",
  },
  {
    value: "강동구",
    label: "강동구",
  },
  {
    value: "강남구",
    label: "강남구",
  },
];
export default function MainPage() {
  // const { loading, error, data, fetchMore } = useQuery(LIST_STORES_QUERY, {
  //   variables: {
  //     page: 0,
  //     user_id: "shogong",
  //     required: true,
  //   },
  // });

  const onSearchButtonClick = (e, value) => {
    console.log(e);
    e.preventDefault();
    console.log(value.state.input);
  };
  const classes = useStyles();
  const [checked, setChecked] = React.useState([24, 22]);
  const [seouls, setSeouls] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });
  const [songpas, setSongpas] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });
  const [classificationChips, setClassificationChips] = useState([
    {
      label: "봉제",
      state: false,
      id: 0,
    },
    {
      label: "원단/편직",
      state: false,
      id: 1,
    },
  ]);
  const [itemChips, setItemChips] = useState([
    {
      label: "티셔츠",
      state: false,
      id: 0,
    },
    {
      label: "셔츠",
      state: false,
      id: 1,
    },
    {
      label: "니트",
      state: false,
      id: 2,
    },
    {
      label: "티셔츠",
      state: false,
      id: 3,
    },
    {
      label: "셔츠",
      state: false,
      id: 4,
    },
    {
      label: "니트",
      state: false,
      id: 5,
    },
  ]);
  const handleSeoulsChange = (event) => {
    setSeouls({
      ...seouls,
      [event.target.name]: event.target.value,
    });
  };
  const handleSongpasChange = (event) => {
    setSongpas({
      ...songpas,
      [event.target.name]: event.target.value,
    });
  };

  // const handleOnScroll = useCallback(() => {
  //   var scrollTop =
  //     (document.documentElement && document.documentElement.scrollTop) ||
  //     document.body.scrollTop;
  //   var scrollHeight =
  //     (document.documentElement && document.documentElement.scrollHeight) ||
  //     document.body.scrollHeight;
  //   var clientHeight =
  //     document.documentElement.clientHeight || window.innerHeight;
  //   var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
  //   if (scrolledToBottom) {
  //     onLoadMore();
  //   }
  // }, [data]);
  // useEffect(() => {
  //   window.addEventListener("scroll", handleOnScroll);
  //   return () => window.removeEventListener("scroll", handleOnScroll);
  // }, [data]);

  // const onLoadMore = useCallback(() => {
  //   fetchMore({
  //     variables: {
  //       page: data.adminUser.result.length,
  //       user_id: "shogong",
  //       required: true,
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       if (!fetchMoreResult) return prev;
  //       const newData = {
  //         ...prev,
  //         adminUser: {
  //           ...prev.adminUser,
  //           result: [
  //             ...prev.adminUser.result,
  //             ...fetchMoreResult.adminUser.result,
  //           ],
  //         },
  //       };
  //       return newData;
  //     },
  //   });
  // }, [data]);
  const data = JSON.parse(
    '{"adminUser":{"__typename":"UserList","result":[{"__typename":"User","id":"2","contact":"010-7112-6340","manager":"박윤범","position":"대표","business":{"__typename":"BusinessInfo","license_name":"쇼공","category":{"__typename":"Data","content":"패션잡화"}}},{"__typename":"User","id":"3","contact":"010-6500-9484","manager":"신영재","position":"팀원1123","business":{"__typename":"BusinessInfo","license_name":"(주)쇼공","category":{"__typename":"Data","content":"패션의류"}}},{"__typename":"User","id":"10","contact":"47328901","manager":"엄태준","position":"엄태준","business":{"__typename":"BusinessInfo","license_name":"엄태준","category":{"__typename":"Data","content":"식품"}}},{"__typename":"User","id":"11","contact":"010-1234-5678","manager":"테스트","position":"테스트","business":{"__typename":"BusinessInfo","license_name":"쇼공","category":{"__typename":"Data","content":"식품"}}},{"__typename":"User","id":"12","contact":"010-3708-2142","manager":"신세진","position":"사원","business":{"__typename":"BusinessInfo","license_name":"서은농장","category":{"__typename":"Data","content":"식품"}}},{"__typename":"User","id":"13","contact":"010-5586-7032","manager":"김관우","position":"대표","business":{"__typename":"BusinessInfo","license_name":"퍼스트에비뉴","category":{"__typename":"Data","content":"패션의류"}}},{"__typename":"User","id":"17","contact":"010-3163-4785","manager":"유하원","position":"담당자","business":{"__typename":"BusinessInfo","license_name":"농업회사법인주식회사나나팜","category":{"__typename":"Data","content":"식품"}}},{"__typename":"User","id":"19","contact":"010-4611-2859","manager":"나원준","position":"영업","business":{"__typename":"BusinessInfo","license_name":"디포스(DFOS)","category":{"__typename":"Data","content":"패션의류"}}},{"__typename":"User","id":"20","contact":"010-1010-1010","manager":"춤추는","position":"망고","business":{"__typename":"BusinessInfo","license_name":"춤추는 망고나라","category":{"__typename":"Data","content":"패션의류"}}},{"__typename":"User","id":"21","contact":"010-8742-4881","manager":"유수진","position":"팀장","business":{"__typename":"BusinessInfo","license_name":"삼무루지새싹삼","category":{"__typename":"Data","content":"식품"}}}],"total":17}}'
  );
  const handleDelete = () => {};
  const handleItemClick = useCallback((index) => {
    setItemChips((itemChips) =>
      itemChips.map((chip) =>
        chip.id === index
          ? {
              ...chip,
              state: !chip.state,
            }
          : chip
      )
    );
  }, []);
  const handleClassificationClick = useCallback((index) => {
    console.log(index);
    setClassificationChips((classificationChips) =>
      classificationChips.map((chip) =>
        chip.id === index
          ? {
              ...chip,
              state: !chip.state,
            }
          : chip
      )
    );
  }, []);
  console.log("리셋");
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        {/* <div className={classes.title}>
          <h2>Basic Elements</h2>
        </div> */}
        <div id="buttons">
          <List>
            <ListItem disableGutters={true}>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                주소
              </Typography>
              <SearchInputConsumer>
                {(value) => {
                  return (
                    <form
                      className={classes.rightItem}
                      onSubmit={(e) => onSearchButtonClick(e, value)}
                      style={{ marginBottom: "0" }}
                    >
                      <CustomInput
                        white
                        inputRootCustomClasses={classes.inputRootCustomClasses}
                        formControlProps={{
                          className: classes.formControl,
                        }}
                        inputProps={{
                          placeholder: "공장을 검색하세요",
                          inputProps: {
                            "aria-label": "Search",
                            className: classes.searchInput,
                          },
                        }}
                      />
                      <Button
                        justIcon
                        color="white"
                        size="sm"
                        onClick={(e) => onSearchButtonClick(e, value)}
                      >
                        <Search className={classes.searchIcon} />
                      </Button>
                    </form>
                  );
                }}
              </SearchInputConsumer>
            </ListItem>

            <ListItem disableGutters={true}>
              <Typography
                variant="body1"
                style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
              >
                지역
              </Typography>
              <CustomDropdown
                noLiPadding
                buttonText="asdf"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent",
                }}
                dropdownList={[
                  <Link to="/" className={classes.dropdownLink}>
                    All components
                  </Link>,
                  <a
                    href="https://creativetimofficial.github.io/material-kit-react/#/documentation?ref=mkr-navbar"
                    target="_blank"
                    className={classes.dropdownLink}
                  >
                    Documentation
                  </a>,
                ]}
              />
              <Box className={classes.rightItem}>
                <TextField
                  fullWidth
                  className={classes.selectInput}
                  label="시"
                  name="state"
                  onChange={handleSeoulsChange}
                  select
                  SelectProps={{ native: true }}
                  value={seoul.state}
                  variant="outlined"
                >
                  {seoul.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Box>
              <Box className={classes.rightItem}>
                <TextField
                  fullWidth
                  className={classes.selectInput}
                  label="구"
                  name="state"
                  onChange={handleSongpasChange}
                  select
                  SelectProps={{ native: true }}
                  value={songpa.state}
                  variant="outlined"
                >
                  {songpa.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Box>
            </ListItem>
            <ListItem disableGutters={true}>
              <Typography
                variant="body1"
                style={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  marginBottom: "10px",
                }}
              >
                분야
              </Typography>

              <Grid container justify={"flex-start"}>
                {classificationChips.map((chip, index) => (
                  <Grid item style={{ marginBottom: "10px" }}>
                    <ChipListItem
                      chip={chip}
                      index={index}
                      handleClassificationClick={handleClassificationClick}
                      className={classes.rightItem}
                    />
                  </Grid>
                ))}
              </Grid>
            </ListItem>
            <ListItem disableGutters={true}>
              <Typography
                variant="body1"
                style={{
                  fontWeight: "bold",
                  whiteSpace: "nowrap",
                  marginBottom: "10px",
                }}
              >
                품목
              </Typography>
              <Grid container>
                {itemChips.map((chip, index) => (
                  <Grid item style={{ marginBottom: "10px" }}>
                    <ChipListItem
                      chip={chip}
                      index={index}
                      handleClassificationClick={handleItemClick}
                      className={classes.rightItem}
                    />
                  </Grid>
                ))}
              </Grid>
            </ListItem>
          </List>

          <Box mt={3} />
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
            이미지 컨텐츠 제조 공장
          </Typography>
          <GridContainer justify="space-around" spacing={0}>
            {/* {loading ? (
              <CircularProgress />
            ) : (
      
            )} */}

            {data.adminUser.result.map((post) => (
              <GridItem xs={12} sm={12} md={6} key={post.id}>
                <FactoryCards headerColor="primary" post={post} />
              </GridItem>
            ))}
            {/* <GridItem xs={12} sm={12} md={6}>
              <CustomTabs headerColor="primary" />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomTabs headerColor="primary" />
            </GridItem> */}
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
