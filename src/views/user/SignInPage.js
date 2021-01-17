import React, { useState, useEffect } from "react";

import styled from "styled-components";
//import { Form, Modal } from "semantic-ui-react";
import {
  Snackbar,
  Grow,
  Modal,
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

// nodejs library that concatenates classes
import classNames from "classnames";
import Alert from "@material-ui/lab/Alert";
//style
import styles from "assets/jss/material-kit-react/views/factoryDetailPage.js";
import javascriptStyles from "assets/jss/material-kit-react/views/componentsSections/javascriptStyles.js";
import setClient from "lib/api/setClient";
import * as authAPI from "lib/api/auth";

import Layout from "components/layout";
import Title from "components/title";
import BasicBtn from "components/common/BasicBtn";
import TermsOfUse from "components/common/TermsOfUse";
import { Formik } from "formik";
const GrowTransition = (props) => {
  return <Grow {...props} />;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
`;

const LicenseConfirm = styled.p`
  font-size: 0.7rem;
  text-align: center;

  span {
    color: #4183c4;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  ...styles,
  ...javascriptStyles,
  snackbarAlertStlye:{
    paddingTop:"50px",
  },
  endAdornment:{
    paddingRight:"0px",
  }
}));
const SignInPage = ({ history }) => {
  const [classicModal, setClassicModal] = useState(false);
  const onClickClassicModal = (isOpen) => {
    console.log("SignInPage)"+isOpen);
    setClassicModal(isOpen);
  };

  // 로딩 관련 스테이트
  const classes = useStyles();
  const client = setClient();
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // 회원가입 폼 데이터 스테이트
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    info: "",
    contact: "",
    email: "",
  });

  // 에러 관련 스테이트, 변수
  const [errorState, setErrorState] = useState({
    open: false,
    Transition: Grow,
  });
  const vertical = "top";
  const horizontal = "center";

  // 벨리데이션 관련 스테이트
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [overlapCheck, setOverlapCheck] = useState("initial");

  // 벨리데이션 액션
  const validateAction = ({ username, password, email, name, contact }) => ({
    username: /^[a-zA-Z\d]{4,12}$/.test(username),
    password:
      password.length >= 10 &&
      (password.search(/[0-9]/g) > 0 ||
        password.search(/[a-z|A-Z]/g) > 0 ||
        password.search(/[$@$!%*#?&]/gi) > 0),
    passwordConfirm: password === passwordConfirm,
    email: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{1,}$/.test(email),
    name: /[ㄱ-ㅎ|ㅏ-ㅣ|가-힇]$/.test(name),
    contact: Boolean(contact),
  });

  // 벨리데이션 상태 객체
  const validation = validateAction(formData);

  // 모든 벨리데이션을 만족하는 지에 대한 변수
  const isCorrect = Object.values(validation).every((i) => i);

  // 아이디 중복 확인 상태를 초기화하는 함수
  const resetAction = (name, value) => {
    setLoading(false);
    setOverlapCheck("initial");
    setFormData({ ...formData, [name]: value });
  };

  // 아이디와 비밀번호 검증을 처리하며, 입력 값을 관리하는 함수
  const onChange = ({ target: { value, name } }) =>
    name === "username"
      ? overlapCheck !== "initial"
        ? resetAction(name, value)
        : setFormData({ ...formData, [name]: value })
      : name === "passwordConfirm"
      ? setPasswordConfirm(value)
      : setFormData({ ...formData, [name]: value });

  // 에러 메세지 렌더 조건 처리하는 함수
  const onClickToast = (Transition) =>
    (!isCorrect || overlapCheck !== false) &&
    setErrorState({ open: true, Transition });

  // 에러 메세지 닫는 함수
  const onClose = () => setErrorState({ ...errorState, open: false });

  // 에러 메세지 컴포넌트
  const AlertToast = ({ Transition }) =>
    isCorrect ? (
      overlapCheck === "initial" && (
        <Snackbar
          open={errorState.open}
          anchorOrigin={{
            vertical,
            horizontal,
          }}
          autoHideDuration={4000}
          onClose={onClose}
          TransitionComponent={Transition}
        >
          <Alert variant="filled" severity="error" className={classes.snackbarAlertStlye}>
            아이디 중복확인을 진행해주세요.
          </Alert>
        </Snackbar>
      )
    ) : (
      // : (
      //   !validate.contactCheck && (
      //     <Snackbar
      //       open={errorState.open}
      //       anchorOrigin={{
      //         vertical,
      //         horizontal,
      //       }}
      //       autoHideDuration={4000}
      //       onClose={onClose}
      //       TransitionComponent={Transition}
      //     >
      //       <Alert variant="filled" severity="error">
      //         휴대폰 번호 인증을 완료해주세요.
      //       </Alert>
      //     </Snackbar>
      //   )
      // )
      <Snackbar
        open={errorState.open}
        anchorOrigin={{
          vertical,
          horizontal,
        }}
        autoHideDuration={4000}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <Alert variant="filled" severity="error" className={classes.snackbarAlertStlye}>
          모든 정보를 빠짐없이 입력해주세요.
        </Alert>
      </Snackbar>
    );

  // 회원가입 버튼 클릭하면 동작하는 함수
  const onSubmit = (e) => {
    e.preventDefault();
    setFormLoading(true);
    isCorrect && !overlapCheck
      ? client
          .request(authAPI.createUserMutation, {
            input: { individual: true, ...formData },
          })
          .then(
            ({
              createUser: {
                user: { username },
                access_token,
              },
            }) => {
              setFormLoading(false);
              console.log(access_token);
              console.log(username);
              // sessionStorage.setItem("access_token", access_token);
              // sessionStorage.setItem("username", username);
              alert(
                "회원가입이 완료되었습니다. 가입하신 아이디로 로그인 해주세요."
              );
              history.replace("/login");
            }
          )
          // .then(() => {
          //   history.replace("/register/success", null);
          // })
          .catch((e) => {
            console.error(e);
            alert("회원가입에 실패했습니다. 다시 시도해주세요.");
          })
      : setFormLoading(false);
  };

  // 휴대폰 번호 자동 포맷팅 해주는 함수
  const autoFormatContact = ({ target: { value } }) =>
    setFormData({
      ...formData,
      contact: value
        .replace(/[^0-9]/g, "")
        .replace(
          /(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,
          "$1-$2-$3"
        )
        .replace("--", "-"),
    });

  // 아이디 중복체크 관련 액션(실제 서버요청 보내는 함수)
  const checkAction = () => {
    setLoading(true);
    client
      .request(authAPI.checkUsernameQuery, {
        username: formData.username,
      })
      .then(({ userOverlap }) => {
        setLoading(false);
        setOverlapCheck(userOverlap);
        userOverlap
          ? alert(
              `${formData.username}은 사용중인 아이디입니다.\n다른 아이디를 사용해주세요.`
            )
          : alert(`${formData.username}은 사용가능한 아이디입니다.`);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 아이디 중복체크 관련 함수
  const idOverlapCheck = (e) => {
    e.preventDefault();
    return validation.username
      ? checkAction()
      : formData.username === ""
      ? alert("아이디를 입력해주세요.")
      : alert("아이디의 양식이 올바르지 않습니다.");
  };

  const btnAction = (
    <Button
      name="idCheck"
      onClick={idOverlapCheck}
      loading={loading}
      style={{
        backgroundColor:
          (!loading && overlapCheck === "initial") || loading
            ? "#5E94E4"
            : overlapCheck === false
            ? "green"
            : !loading && overlapCheck === true && "red",
        color: "#fff",
        minWidth:"80px",
      }}
      disabled={
        !loading && overlapCheck === "initial"
          ? false
          : loading
          ? true
          : !loading && !overlapCheck && true
      }
    >
      {
        !loading && overlapCheck === "initial"
          ? "중복확인"
          : !loading && overlapCheck === false
          ? "사용가능"
          : "사용불가"
      }
      {loading && <CircularProgress disableShrink  color="secondary" size={30} />}
    </Button>
  );

  // 휴대폰 번호 인증 관련 함수
  // const validateContact = (e) => {
  //   e.preventDefault();
  //   if (!formData.contact) {
  //     return alert("휴대폰 번호를 먼저 입력해주세요.");
  //   }

  //   setValidate({ ...validate, contactCheck: true });
  //   console.log("휴대폰 인증 완료");

  //   if (validate.contactCheck) {
  //     return alert("이미 인증하셨습니다.");
  //   }
  // };
  // action={
  //   <Button
  //     name="contactCheck"
  //     onClick={validateContact}
  //     toggle
  //     active={validate.contactCheck}
  //   >
  //     {!validate.contactCheck ? "인증하기" : "인증완료"}
  //   </Button>
  // }

  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      {/* <Head>
        <title>회원가입 | 쇼공, 쇼핑을 공장에서</title>
      </Head> */}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        style={{ paddingTop: "120px" }}
      >
        <Container maxWidth="xs">
          <Formik>
            <form onSubmit={onSubmit}>
              {[
                [
                  12,
                  "아이디",
                  "4글자 이상 12글자 미만 영어 대・소문자, 숫자",
                  "username",
                  !!formData.username &&
                    !validation.username && {
                      content: "올바른 아이디 형식이 아닙니다",
                    },
                  btnAction,
                ],
                [
                  null,
                  "비밀번호",
                  "영문, 숫자, 특수문자 중 2가지 이상을 조합한 10글자 이상",
                  "password",
                  !!formData.password &&
                    !validation.password && {
                      content:
                        "영문, 숫자, 특수문자 중 2가지 이상을 조합한 10글자 이상을 입력해주세요",
                    },
                ],
                [
                  null,
                  "비밀번호 확인",
                  "비밀번호를 다시 한 번 입력해주세요",
                  "passwordConfirm",
                  !!passwordConfirm &&
                    !validation.passwordConfirm && {
                      content: "비밀번호가 일치하지 않습니다",
                    },
                ],
                [
                  null,
                  "이름",
                  "홍길동",
                  "name",
                  !!formData.name &&
                    !validation.name && {
                      content: "한글만 입력 가능합니다",
                    },
                ],
                [
                  13,
                  "휴대전화 번호",
                  "-를 제외한 휴대전화 번호만 입력해주세요",
                  "contact",
                  !!formData.contact &&
                    !validation.contact && {
                      content: "올바른 전화번호 형식이 아닙니다.",
                    },
                  null,
                  autoFormatContact,
                ],
                [
                  null,
                  "이메일",
                  "shogong@example.com",
                  "email",
                  !!formData.email &&
                    !validation.email && {
                      content: "올바른 이메일 형식이 아닙니다.",
                    },
                ],
              ].map(
                ([
                  maxLength,
                  label,
                  placeholder,
                  name,
                  error,
                  action,
                  func,
                ]) => (
                  <TextField
                    key={label}
                    required
                    maxLength={maxLength}
                    autoComplete="off"
                    type={name.includes("password") ? "password" : "text"}
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    value={
                      name === "passwordConfirm"
                        ? passwordConfirm
                        : formData[name]
                    }
                    autoFocus={name === "username"}
                    onChange={onChange}
                    error={error}
                    InputProps={{endAdornment: action,    classes: {
                      adornedEnd: classes.endAdornment
                    }}}
                    // action={action}
                    onKeyUp={func}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    className={classes.root}
                  />
                )
              )}
              <Button
                loading={formLoading}
                fluid
                onClick={() => onClickToast(GrowTransition)}
                size="large"
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
              >
                동의하고 회원가입
              </Button>
              <LicenseConfirm>
                회원가입 시 
                <Link onClick={() => setClassicModal(true)}>
                  이용약관 및 개인정보 수집 항목
       
                </Link>
                <TermsOfUse
                    classes={classes}
                    onClickClassicModal={onClickClassicModal}
                    classicModal={classicModal}
                  />
                에 동의하는 것으로 간주합니다.
              </LicenseConfirm>
            </form>
            
          </Formik>
          {errorState.open && <AlertToast Transition={errorState.Transition} />}
        </Container>
      </Box>
    </div>
  );
};

export default SignInPage;
