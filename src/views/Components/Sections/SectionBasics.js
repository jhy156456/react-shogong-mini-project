import React, { useState, useEffect, useCallback, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import AutocompleteSelect from "components/common/AutocompleteSelect.js"
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import { Query } from "react-apollo";
import { useQuery, useLazyQuery } from "@apollo/client";
import { LIST_STORES_QUERY } from "lib/api/posts.js";
import { TextField, Typography, Box } from "@material-ui/core";
import Autocomplete from "components/common/AutocompleteSelect";
import SearchInputContext from "contexts/search.js";
import {
  SearchInputContextProvider,
  SearchInputConsumer,
} from "contexts/search.js";

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
  if (loading) return <p>불러오는중..</p>;
  console.log(data);

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        {/* <div className={classes.title}>
          <h2>Basic Elements</h2>
        </div> */}
        <div id="buttons">
          <GridContainer justify="space-around" spacing={0}>
            <GridItem xs={12} sm={12} md={6}>
              <Typography>상세필터</Typography>
              <Box mb={2} />
            </GridItem>
            <GridItem xs={12} sm={12} md={6} />
            <GridItem xs={12} sm={12} md={6}>
              <GridContainer justify="flex-start">
                <GridItem xs={6} sm={6} md={6}>
                  {" "}
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
                </GridItem>
                <GridItem xs={6} sm={6} md={6}>
                  {" "}
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
                </GridItem>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} sm={12} md={6} />
            <SearchInputConsumer>
              {(value) => {
                const filterData = data.adminUser.result.filter((c) => {
                  return (
                    c.business.license_name.indexOf(value.state.input) > -1
                  );
                });

                return filterData.map((post) => (
                  <GridItem xs={12} sm={12} md={6} key={post.id}>
                    <CustomTabs headerColor="primary" post={post} />
                  </GridItem>
                ));
              }}
            </SearchInputConsumer>

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
