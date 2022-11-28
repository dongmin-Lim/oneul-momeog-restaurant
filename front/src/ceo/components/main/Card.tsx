import axios from "axios";
import styled from "styled-components";
import { receiveProps } from "./Main";

interface Props {
  status: string;
  Info: receiveProps;
  receiveArr: any;
  setReceiveArr: any;
  deliveryArr: any;
  setDeliveryArr: any;
  finishArr: any;
  setFinishArr: any;
}

function Card({
  status,
  Info,
  receiveArr,
  setReceiveArr,
  deliveryArr,
  setDeliveryArr,
  finishArr,
  setFinishArr,
}: Props) {
  async function statusHandler(mod: string) {
    const response = await axios.patch(
      `/api/ceo/main/restaurant/${Info.restaurantId}/${mod}?roomId=${Info.roomId}`
    );
    console.log(response);
    console.log(Info);
    const responseLists = await axios.get(`/api/ceo/main/restaurant/1`);
    console.log(responseLists.data.data);
    setReceiveArr(responseLists.data.data.ready); //접수대기
    setDeliveryArr(responseLists.data.data.receive); //접수완료
    setFinishArr(responseLists.data.data.delivery);
  }

  function ButtonStatus() {
    switch (status) {
      case "receive":
        return (
          <>
            <Receipt onClick={() => statusHandler("receive")}>접수</Receipt>
            <Cancel onClick={() => statusHandler("cancel")}>취소</Cancel>
          </>
        );
      case "delivery":
        return <Complete onClick={() => statusHandler("delivery")}>조리완료</Complete>;
      case "finish":
        return <Delivery onClick={() => statusHandler("finish")}>배달완료</Delivery>;
    }
  }

  return (
    <Div>
      <Content>
        <Top>
          <Tag>요청시간 {Info?.readyTime?.toString().split("T")[1]}</Tag>
          <Tag>결제완료 {Info?.totalPrice?.toLocaleString("ko-KR")}원</Tag>
        </Top>

        <Menu>{Info?.exMenu}</Menu>
        <Tag style={{ textAlign: "start" }}>{Info?.deliveryLocation}</Tag>
      </Content>
      <ButtonContainer>
        <ButtonStatus />
      </ButtonContainer>
    </Div>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  justify-items: center;
  width: 100%;
  height: 150px;
  border: 1px solid black;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin: 0 auto;
`;

const Tag = styled.div`
  border: 1px solid black;
  padding: 2px 5px;
`;

const Menu = styled.div`
  text-align: start;
  font-size: 24px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 auto;
`;

const Receipt = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  font-weight: bold;
  background-color: green;
  color: white;
`;

const Cancel = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  font-weight: bold;
  background-color: red;
  color: white;
`;

const Complete = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  padding: 0px 10px;
  font-weight: bold;
  background-color: green;
  color: white;
`;

const Delivery = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  padding: 0px 10px;
  font-weight: bold;
  background-color: green;
  color: white;
`;

export default Card;
