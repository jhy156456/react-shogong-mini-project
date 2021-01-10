import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";
// import Faker from "faker";
import work1 from "assets/img/examples/olu-eletu.jpg";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  fonts: {
    fontWeight: "bold",
  },
  inline: {
    display: "inline",
  },
}));

const Comment = ({ comments }) => {
  const classes = useStyles();
  return (
    <List  disablePadding={true} classes={{root:classes.root}}>
      {comments.map((comment) => {
        return (
          <React.Fragment key={comment.id}>
            <ListItem
              key={comment.id}
              alignItems="flex-start"
              disableGutters={true}
            >
              <ListItemText
                primary={
                  <Typography className={classes.fonts}>
                    {comment.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.email}
                    </Typography>
                    {` - ${comment.body}`}
                  </>
                }
              />
            </ListItem>
            <Divider />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Comment;
