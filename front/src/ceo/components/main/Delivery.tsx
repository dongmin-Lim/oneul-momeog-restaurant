import styled from "styled-components";
import Card from "./Card";

function Delivery({
  receiveArr,
  setReceiveArr,
  deliveryArr,
  setDeliveryArr,
  finishArr,
  setFinishArr,
}: any) {
  return (
    <Div>
      접수완료
      {deliveryArr.map((value: any, index: number) => (
        <Card
          status="delivery"
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
export default Delivery;
