import React, {
  useState,
  useCallback,
  useMemo,
  useContext,
  useEffect,
} from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// nodejs library that concatenates classes
import classNames from "classnames";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import setClient from "lib/api/setClient";
import * as authAPI from "lib/api/auth";
import { useHistory } from 'react-router'
//context API
import { SearchInputConsumer } from "contexts/search.js";
import {
  makeStyles,
  Avatar,
  Typography,
  TextField,
  Snackbar,
  Checkbox,
  Divider,
  FormControlLabel,
  Button,
  CircularProgress,
  Box,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

//import { Checkbox, Divider } from "semantic-ui-react";

import BasicBtn from "components/common/BasicBtn";
import ButtonBox from "components/common/ButtonBox";
import Background from "components/Background";
//style
import styles from "assets/jss/material-kit-react/views/factoryDetailPage.js";

const MainWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #fff;
  padding-top: 50px;
`;

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  flex: 0.88 1 0%;
  padding: 24px;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 360px;
  padding-left: 16px;
  padding-right: 16px;
`;

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  height: auto;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CopyRightTitle = styled.p`
  margin: 1rem 0;
  color: rgba(0, 0, 0, 0.54);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  text-align: center;

  a {
    color: rgba(0, 0, 0, 0.54);
  }
`;

const savedUser = typeof window !== "undefined" && localStorage.getItem("user");

const admin = true;

const useStyles = makeStyles((theme) => ({
  ...styles,
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#5e94e4",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  register: {
    color: "#fff",
  },
  remember: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "0.5em",
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "0.875rem",
    alignItems: "center",
  },
  find: {
    display: "flex",
    width: "50%",
    margin: 0,
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  toast: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Copyright = () => (
  <CopyRightTitle>
    쇼공,{" "}
    <a
      href="https://www.shogong.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      쇼핑을 공장에서
    </a>{" "}
    {new Date().getFullYear()}.
  </CopyRightTitle>
);

const boxStyle = {
  bottom: "0.7rem",
};

const LoginPage = ( ) => {
  const history = useHistory();
  const client = setClient();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: savedUser ? savedUser : "",
    password: "",
    saveUser: savedUser ? true : false,
  });

  const [error, setError] = useState(null);
  const [errorState, setErrorState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [loading, setLoading] = useState(false);

  const btnStyle = useMemo(
    () => ({ backgroundColor: "#3e6baf", color: "#fff" }),
    []
  );

  // useEffect(() => {
  //   if (sessionStorage.getItem("access_token")) {
  //     admin ? router.replace("/", null) : router.replace("/list/products", null);
  //   }
  // }, [admin, router]);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("setloading");
      setLoading(true);
      formData.saveUser && localStorage.setItem("user", formData.username);
      client
        .request(authAPI.loginQuery, formData)
        .then(
          ({
            userCheck: {
              user: { username, deliver, business, individual },
              access_token,
            },
          }) => {
            setLoading(false);
            // console.log("username: ", username);
            // console.log("deliver: ", deliver);
            // console.log("business: ", business);
            // console.log("individual: ", individual);
            // console.log("access_token: ", access_token);
            sessionStorage.setItem(
              "role",
              username === "shogong" ? "admin" : "individual"
            );
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("access_token", access_token);
            sessionStorage.setItem("deliver", deliver ? deliver.id : "");
            sessionStorage.setItem("business", business ? business.id : "");
            history.replace("/");
          }
        )
        .catch((e) => {
          console.log("catch");
          for (var i = 0; i < 1099999000; i++) {}
          setLoading(false);

          setError("아이디나 비밀번호를 확인해주세요");
          setErrorState({ ...errorState, open: true });
          console.error(e);
        });
    },
    [loading, formData, error, errorState]
  );

  const onClick = useCallback(() => {
    setErrorState({ ...errorState, open: true });
  }, [errorState]);

  const onClose = useCallback(() => {
    setErrorState({ ...errorState, open: false });
    setError(null);
  }, [error, errorState]);

  const onChange = useCallback(
    ({ target: { value, name } }) => {
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const goToSignin = useCallback((e) => {
    e.preventDefault();
    history.push("/signin");
  }, []);

  return (
    <>
      {/* <Head>
        <title>로그인 | 쇼공, 쇼핑을 공장에서</title>
      </Head> */}
      <MainWrapper className={classNames(classes.main, classes.mainRaised)}>
        <Wrapper>
          <LoginWrapper>
            <LogoBox>
              <Link to="/">
                <img alt="쇼공 로고" src="/logo.svg" />
              </Link>
            </LogoBox>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <form className={classes.form} noValidate onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="아이디"
                name="username"
                autoComplete="off"
                autoFocus
                onChange={onChange}
                value={formData.username}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
                value={formData.password}
              />
              <div className={classes.remember}>
                <div
                  className={classes.find}
                  onClick={() => alert("개발중입니다.")}
                >
                  아이디/비밀번호 찾기
                </div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.saveUser}
                      name="saveUser"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          saveUser: !formData.saveUser,
                        })
                      }
                    />
                  }
                  label={
                    <Box style={{ fontSize: "0.875rem" }}>아이디 기억하기</Box>
                  }
                />
              </div>
              <Divider style={{ marginBottom: "10px" }} />
              <ButtonBox margin={boxStyle} justify="space-between">
                <Button
                  type="submit"
                  className="btn"
                  onClick={onClick}
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  {!loading && "로그인"}
                  {loading && (
                    <CircularProgress
                      disableShrink
                      color="secondary"
                      size={30}
                    />
                  )}
                </Button>
              </ButtonBox>
              <ButtonBox margin={boxStyle} justify="space-between">
                <Button
                  style={btnStyle}
                  className="btn"
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={goToSignin}
                >
                  회원가입
                </Button>
              </ButtonBox>
            </form>
            <Copyright />
            {error !== null && (
              <div className={classes.root}>
                <Snackbar
                  open={errorState.open}
                  anchorOrigin={{
                    vertical: errorState.vertical,
                    horizontal: errorState.horizontal,
                  }}
                  autoHideDuration={6000}
                  onClose={onClose}
                >
                  <Alert
                    variant="filled"
                    severity="error"
                    style={{ paddingTop: "50px" }}
                  >
                    {error}
                  </Alert>
                </Snackbar>
              </div>
            )}
          </LoginWrapper>
        </Wrapper>
        <Background />
      </MainWrapper>
    </>
  );
};

export default LoginPage;
