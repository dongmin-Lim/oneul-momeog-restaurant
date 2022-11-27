import styled from "styled-components";
import Card from "./Card";

function Wait() {
  return (
    <Div>
      접수대기
      <Card status="wait" />
    </Div>
  );
}

const Div = styled.div`
  /* border: 1px solid black; */
`;

export default Wait;
