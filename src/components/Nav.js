import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import styled from "styled-components";

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: auto;
  right: 0;
  display: flex;
  flex-flow: row nowrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0.625rem 0;
  margin-bottom: 20px;
  border-radius: 3px;
  transition: all 150ms ease 0s;
  background: transparent;
  /* box-shadow: 0 4px 18px 0px rgb(0 0 0 / 12%), 0 7px 10px -5px rgb(0 0 0 / 15%); */
  z-index: 1100;
`;

const Container = styled.nav`
  display: flex;
  flex: 1;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding: 0 15px;
  width: 100%;
  max-width: 1140px;
  min-height: 50px;

  @media screen and (max-width: 992px) {
    max-width: 720px;
  }

  @media screen and (max-width: 768px) {
    max-width: 720px;
  }

  @media screen and (max-width: 576px) {
    max-width: 540px;
  }
`;

const NavItemWrapper = styled.ul`
  display: flex;
  align-items: center;
  height: 52.5px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.5em;

  cursor: pointer;
`;

const NavItem = styled.li`
  width: auto;
`;

const NavItemLink = styled.a`
  display: inline-flex;
  padding: 0.9375rem;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  border-radius: 3px;
  color: #fff;

  &:hover {
    color: #fff;
    background: rgba(200, 200, 200, 0.2);
    transition: background 0.3s ease-in-out;
  }
`;

const Nav = () => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("access_token")) {
      setIsLogin(true);
    }
  }, [isLogin]);

  const handleLogin = useCallback(() => {
    if (isLogin) {
      sessionStorage.clear();
      setIsLogin(false);
      router.replace("/");
    } else {
      router.push("/login");
    }
  }, [isLogin]);

  return (
    <Wrapper>
      <Container>
        <Link href="/">
          <a>
            <Image alt="쇼공 로고" src="/logo_white.svg" width={108} height={26} />
          </a>
        </Link>
        <NavItemWrapper>
          <NavItem>
            <NavItemLink onClick={handleLogin}>{isLogin ? "로그아웃" : "로그인"}</NavItemLink>
          </NavItem>
          {!isLogin && (
            <NavItem>
              <Link href="/signin">
                <NavItemLink>회원가입</NavItemLink>
              </Link>
            </NavItem>
          )}
        </NavItemWrapper>
      </Container>
    </Wrapper>
  );
};

export default Nav;
