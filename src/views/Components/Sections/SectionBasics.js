import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AutocompleteSelect from "components/common/AutocompleteSelect.js"
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";


// core components
import CustomTabs from "components/CustomTabs/CustomTabs.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/basicsStyle.js";
import { Query } from "react-apollo";
import { LIST_STORES_QUERY } from "lib/api/posts.js";

const useStyles = makeStyles(styles);

export default function SectionBasics() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([24, 22]);

  return (
    <div className={classes.sections}>
      <div className={classes.container}>
        {/* <div className={classes.title}>
          <h2>Basic Elements</h2>
        </div> */}
        <div id="buttons">
          <div className={classes.title}>
            <h3>
              상세필터
              <br />
            </h3>
          <AutocompleteSelect/>
          </div>
          <GridContainer justify="flex-start">
            <Query
              query={LIST_STORES_QUERY}
              variables={{
                page: 0,
                user_id: "shogong",
                required: true,
              }}
            >
              {({ data, loading }) =>
                loading ? (
                  <p>불러오는중..</p>
                ) : (
                  <>
                  {console.log(data.adminUser)}
                    {data.adminUser.result.map((post) => (
                      <GridItem xs={12} sm={12} md={6} key={post.id}>
                        <CustomTabs headerColor="primary" post={post} />
                      </GridItem>
                    ))}
                  </>
                )
              }
            </Query>

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
