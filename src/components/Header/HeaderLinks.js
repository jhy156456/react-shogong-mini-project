/*eslint-disable*/
import React, {useEffect} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import {Link, withRouter} from "react-router-dom";
import {useHistory} from 'react-router'
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import {Apps, CloudDownload} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
//context API
import {SearchInputConsumer} from "contexts/search.js";
const useStyles = makeStyles(styles);

const HeaderLinks = (props) => {
    const classes = useStyles();
    const history = useHistory()
    console.log("HeaderLinks : " + sessionStorage.getItem("role"))
    useEffect(() => {}, [sessionStorage.getItem("role")])
    return (
        <SearchInputConsumer>
            {
                ({state}) => (
                    <List className={classes.list} >
                        <ListItem className={classes.listItem} style={{width:'100%'}}>
                            <Button
                                color="transparent"
                                className={classes.navLink}
                                >
                                <h6>메뉴 준비중입니다.</h6>
                                {/* <i className={classes.socialIcons + " fab fa-instagram"} /> */}
                            </Button>
                            <Button
                                color="transparent"
                                className={classes.navLink}
                                >
                                <h6>메뉴 준비중입니다.</h6>
                                {/* <i className={classes.socialIcons + " fab fa-instagram"} /> */}
                            </Button>
                        </ListItem>
                    </List>
                )
            }
        </SearchInputConsumer>
    );
}

export default withRouter(HeaderLinks)