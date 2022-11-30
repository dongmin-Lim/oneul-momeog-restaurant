import styled from "styled-components";
import Card from "./Card";

function Receive({
  receiveArr,
  setReceiveArr,
  deliveryArr,
  setDeliveryArr,
  finishArr,
  setFinishArr,
}: any) {
  return (
    <Div>
      <h2>접수대기</h2>
      {receiveArr.map((value: any, index: number) => (
        <Card
          status="receive"
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

export default Receive;
