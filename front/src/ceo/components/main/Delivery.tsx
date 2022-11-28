import styled from "styled-components";
import Card from "./Card";

function Delivery({ currentArr, setCurrentArr, targetArr, setTargetArr }: any) {
  return (
    <Div>
      접수완료
      {currentArr.map((value: any, index: number) => (
        <Card
          status="delivery"
          Info={value}
          key={index}
          currentArr={currentArr}
          setCurrentArr={setCurrentArr}
          targetArr={targetArr}
          setTargetArr={setTargetArr}
        />
      ))}
    </Div>
  );
}

const Div = styled.div`
  /* border: 1px solid black; */
`;
export default Delivery;
