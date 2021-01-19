import React, { useState, useEffect, useCallback } from "react";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  CircularProgress,
} from "@material-ui/core";
//@material-ui/icons components
import { Search } from "@material-ui/icons";
//custom components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FactoryCards from "components/FactoryCards/FactoryCard.js";
import ChipListItem from "./ChipListItem";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
//styles
import styles from "assets/jss/material-kit-react/views/componentsSections/mainPageStyle.js";
import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.js";
//gql
import { useQuery } from "@apollo/client";
import { LIST_STORES_QUERY } from "lib/api/posts.js";
//context API
import {
  
  SearchInputConsumer,
} from "contexts/search.js";

const useStyles = makeStyles((theme) => ({
  ...styles,
  ...headerLinksStyle,
  gutters: {
    paddingRight: "16px",
  },
}));
export default function MainPage() {
  const { loading,data, fetchMore,error } = useQuery(LIST_STORES_QUERY, {
    variables: {
      page: 0,
      user_id:"shogong",
      required: true,
    },
  });
  console.log("Mainpage")
  console.log(data);
  console.log(error)
  const onSearchButtonClick = (e, value) => {
    console.log(e);
    e.preventDefault();
    console.log(value.state.input);
  };
  const handleDropdownItemClick= (value)=>{
    console.log("MainPage")
    console.log(value);
  }
  const classes = useStyles();

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

  
  const onLoadMore = useCallback(() => {
    fetchMore({
      variables: {
        page: data ? data.adminUser.result.length : 0,
        user_id: "shogong",
        required: true,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        const newData = {
          ...prev,
          adminUser: {
            ...prev.adminUser,
            result: [
              ...prev.adminUser.result,
              ...fetchMoreResult.adminUser.result,
            ],
          },
        };
        return newData;
      },
    });
  }, [data]);
  const handleOnScroll = useCallback(() => {
    var scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    var scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    var clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    var scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      onLoadMore();
    }
  }, [data]);
  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll);
    return () => window.removeEventListener("scroll", handleOnScroll);
  }, [data]);



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

              <Box className={classes.rightItem}>
                <CustomDropdown
                  style={{border: '1px solid #000'}}
                  onClick={handleDropdownItemClick}
                  buttonText="시"
                  buttonProps={{
                    className: classes.navLink,
                    color: "transparent",
                  }}
                  dropdownList={[
                    "Action",
                    "Another action",
                    "Something else here",
                    "Separated link",
                    "One more separated link",
                  ]}
                />
                {/* <TextField
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
                </TextField> */}
              </Box>
              <Box className={classes.rightItem}>
                {/* <TextField
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
                </TextField> */}

                <CustomDropdown
                 style={{border: '1px solid #000'}}
                  buttonText="구"
                  buttonProps={{
                    className: classes.navLink,
                    color: "transparent",
                  }}
                  dropdownList={[
                   "송파구","강동구","강남구"
                  ]}
                />
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
                  <Grid item style={{ marginBottom: "10px" }} key = {index}>
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
                  <Grid item style={{ marginBottom: "10px" }} key = {index}>
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
            {loading ? (
              <CircularProgress />
            ) : (
              <>
              {data && data.adminUser.result.map((post) => (
                <GridItem xs={12} sm={12} md={6} key={post.id}>
                  <FactoryCards headerColor="primary" post={post} />
                </GridItem>
              ))}
              </>
            )}
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
