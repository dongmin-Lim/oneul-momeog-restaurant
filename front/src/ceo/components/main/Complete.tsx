import styled from "styled-components";
import Card from "./Card";

function Complete() {
  return (
    <Div>
      접수완료 <Card status="complete" />
    </Div>
  );
}

const Div = styled.div`
  /* border: 1px solid black; */
`;
export default Complete;
