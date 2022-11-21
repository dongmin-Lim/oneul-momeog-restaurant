import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "../enum/routes";

const Div = styled.div`
  margin-top: 5%;
  text-align: center;
`;

function HomePage() {
  return (
    <Div>
      <Button variant="success" className="m-2">
        오늘모먹
      </Button>
      <Link to={ROUTES.CEO.LOGIN}>
        <Button variant="primary">사장님</Button>
      </Link>
    </Div>
  );
}
export default HomePage;
