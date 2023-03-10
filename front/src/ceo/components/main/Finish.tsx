import styled from "styled-components";
import Card from "./Card";

function Finish({
  receiveArr,
  setReceiveArr,
  deliveryArr,
  setDeliveryArr,
  finishArr,
  setFinishArr,
}: any) {
  return (
    <Div>
      <h2>배달중</h2>
      {finishArr.map((value: any, index: number) => (
        <Card
          status="finish"
          Info={value}
          key={index}
          receiveArr={receiveArr}
          setReceiveArr={setReceiveArr}
          deliveryArr={deliveryArr}
          setDeliveryArr={setDeliveryArr}
          finishArr={finishArr}
          setFinishArr={setFinishArr}
        />
      ))}
    </Div>
  );
}

const Div = styled.div`
  /* border: 1px solid black; */
`;
export default Finish;
