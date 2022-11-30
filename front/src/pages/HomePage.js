import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../enum/routes";

const Div = styled.div`
  margin-top: 5%;
  text-align: center;
`;

function HomePage() {
  useEffect(() => window.location.replace(ROUTES.CEO.LOGIN), []);
  return <Div></Div>;
}
export default HomePage;
