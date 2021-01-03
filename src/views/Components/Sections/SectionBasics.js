import React, { useState, useEffect, useCallback, useContext } from "react";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField, Typography, Box,Chip } from "@material-ui/core";
//core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import FactoryCards from "components/FactoryCards/FactoryCard.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
//styles
import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
//gql
import { useQuery, useLazyQuery } from "@apollo/client";
import { LIST_STORES_QUERY } from "lib/api/posts.js";
//context API
import {
  SearchInputContextProvider,
  SearchInputConsumer,
} from "contexts/search.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Search from "@material-ui/icons/Search";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
  ...styles,
  gutters:{
    paddingRight:'16px',
  }
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
export default function SectionBasics() {
  const { loading, error, data, fetchMore } = useQuery(LIST_STORES_QUERY, {
    variables: {
      page: 0,
      user_id: "shogong",
      required: true,
    },
  });

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

  const onLoadMore = useCallback(() => {
    fetchMore({
      variables: {
        page: data.adminUser.result.length,
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
  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

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

              <Box className={classes.rightItem}>
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
                <Button justIcon color="white" size="sm">
                  <Search className={classes.searchIcon} />
                </Button>
              </Box>
            </ListItem>

            <ListItem disableGutters={true}>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                지역
              </Typography>
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
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                분야
              </Typography>
              <Box className={classes.rightItem}>
                {/* <Typography variant="body1">봉제</Typography> */}
                <Chip
    label="봉제"
    clickable
    color="primary"
    onDelete={handleDelete}
    deleteIcon={<DoneIcon />}
      />
              </Box>
              <Box className={classes.rightItem}>
                <Typography variant="body1">원단/편직</Typography>
              </Box>
            </ListItem>
            <ListItem disableGutters={true}>
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                품목
              </Typography>
              <Box className={classes.rightItem}>
                <Typography variant="body1">티셔츠</Typography>
              </Box>
              <Box className={classes.rightItem}>
                <Typography variant="body1">셔츠</Typography>
              </Box>
              <Box className={classes.rightItem}>
                <Typography variant="body1">니트</Typography>
              </Box>
            </ListItem>
          </List>

          <Box mt={3}/>
          <Typography variant="body1" style={{ fontWeight: "bold" }}>
                이미지 컨텐츠 제조 공장
              </Typography>
          <GridContainer justify="space-around" spacing={0}>
            {loading ? (
              <CircularProgress />
            ) : (
              <SearchInputConsumer>
                {(value) => {
                  const filterData = data.adminUser.result.filter((c) => {
                    return (
                      c.business.license_name.indexOf(value.state.input) > -1
                    );
                  });

                  return filterData.map((post) => (
                    <GridItem xs={12} sm={12} md={6} key={post.id}>
                      <FactoryCards headerColor="primary" post={post} />
                    </GridItem>
                  ));
                }}
              </SearchInputConsumer>
            )}

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
