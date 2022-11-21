import styled from "styled-components";
import Complete from "./Complete";
import Delivery from "./Delivery";
import Wait from "./Wait";

function Main() {
  return (
    <Div>
      <Wait />
      <Complete />
      <Delivery />
    </Div>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 50px;
  width: 950px;
  text-align: center;
  margin: 0 auto;
`;

export default Main;
