import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../enum/routes";
import { Modal, Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

function Nav() {
  const [openState, setOpenState] = useState<boolean>(
    JSON.parse(sessionStorage.getItem("open"))
  );

  function LogOutHandler() {
    sessionStorage.removeItem("jwt");
    sessionStorage.removeItem("restaurantName");
    sessionStorage.removeItem("branch");
    sessionStorage.removeItem("restaurantId");
    sessionStorage.removeItem("open");
    window.location.replace(ROUTES.CEO.LOGIN);
  }

  async function openHandler() {
    try {
      const response = await axios.patch(`/api/ceo/open`, {
        open: !openState,
      });
      setOpenState(response.data.data);
      console.log(response.data.data);
      sessionStorage.setItem("open", JSON.stringify(!openState));
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Div>
      <NavDiv>
        <NavGrid>
          {sessionStorage.getItem("jwt") ? (
            <Link to={ROUTES.CEO.MAIN}>
              <Logo src="../data/img/logo.png" alt="logo" />
            </Link>
          ) : (
            <Link to={ROUTES.CEO.LOGIN}>
              <Logo src="../data/img/logo.png" alt="logo" />
            </Link>
          )}
          <NavList>
            {sessionStorage.getItem("jwt") ? (
              openState ? (
                <div onClick={openHandler}>영업중</div>
              ) : (
                <div onClick={openHandler}>영업종료</div>
              )
            ) : (
              <div></div>
            )}
            {sessionStorage.getItem("jwt") ? (
              <b>
                {sessionStorage.getItem("restaurantName")}{" "}
                {sessionStorage.getItem("branch")} 사장님
              </b>
            ) : (
              <div></div>
            )}
            <div>
              <Link to={ROUTES.CEO.MANAGEMENT}>매장관리</Link>
            </div>
            <div>
              <Link to={ROUTES.CEO.MENU}>메뉴관리</Link>
            </div>
            {sessionStorage.getItem("jwt") ? (
              <div onClick={LogOutHandler}>로그아웃</div>
            ) : (
              <div>
                <Link to={ROUTES.CEO.LOGIN}>로그인</Link>
              </div>
            )}
          </NavList>
        </NavGrid>
      </NavDiv>
    </Div>
  );
}
const Div = styled.div`
  height: 50px;
  width: 100%;
  padding: 10px 50px;
  background-color: #d8f1ff;
  a {
    color: black;
    text-decoration: none;
  }
`;

const NavDiv = styled.div`
  width: 1320px;
  margin: 0 auto;
`;

const NavGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const Logo = styled.img`
  height: 30px;
`;

const NavList = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr 1fr;
  height: 30px;
  width: 100%;
  text-align: end;
  font-size: 18px;
  line-height: 30px;
`;
export default Nav;
