import React, { useState, useEffect, useCallback, useContext } from "react";
//@material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextField, Typography, Box } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => ({
  ...styles,
}));
const states = [
  {
    value: "alabama",
    label: "Alabama",
  },
  {
    value: "new-york",
    label: "New York",
  },
  {
    value: "san-francisco",
    label: "San Francisco",
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
  const [values, setValues] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
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
  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }

  function priceRow(qty, unit) {
    return qty * unit;
  }

  function createRow(desc, qty, unit) {
    const price = priceRow(qty, unit);
    return { desc, qty, unit, price };
  }

  function subtotal(items) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  }
  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        {/* <div className={classes.title}>
          <h2>Basic Elements</h2>
        </div> */}
        <div id="buttons">
          <GridContainer justify="space-around" spacing={0}>
            <GridItem xs={12} sm={12} md={6}>
              <List>
                <ListItem>
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

                <ListItem>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    지역
                  </Typography>
                  <Box className={classes.rightItem}>
                    <TextField
                      fullWidth
                      label="지역"
                      name="state"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Box>
                  <Box className={classes.rightItem}>
                    <TextField
                      fullWidth
                      label="생산방식"
                      name="state"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {states.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Box>
                </ListItem>
                <ListItem>
                  <Typography variant="body1" style={{ fontWeight: "bold" }}>
                    분야
                  </Typography>
                  <Box className={classes.rightItem}>
                    <Typography variant="body1">봉제</Typography>
                  </Box>
                  <Box className={classes.rightItem}>
                    <Typography variant="body1">원단/편직</Typography>
                  </Box>
                </ListItem>
                <ListItem>
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
            </GridItem>
            <GridItem xs={12} sm={12} md={6} />

            <GridItem xs={12} sm={12} md={6}>
              <GridContainer justify="flex-start">
                <GridItem xs={6} sm={6} md={6}>
                  {" "}
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  {" "}
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} />
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
