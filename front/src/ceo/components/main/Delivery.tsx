import styled from "styled-components";
import Card from "./Card";

function Delivery() {
  return (
    <Div>
      배달중 <Card status="delivery" />
    </Div>
  );
}

const Div = styled.div`
  /* border: 1px solid black; */
`;
export default Delivery;
