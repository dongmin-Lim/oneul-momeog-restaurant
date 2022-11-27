import styled from "styled-components";

interface Props {
  status: string;
}

function Card({ status }: Props) {
  function ButtonStatus() {
    switch (status) {
      case "wait":
        return (
          <>
            <Receipt>접수</Receipt>
            <Cancel>취소</Cancel>
          </>
        );
      case "complete":
        return <Complete>조리완료</Complete>;
      case "delivery":
        return <Delivery>배달완료</Delivery>;
    }
  }

  return (
    <Div>
      <Content>
        <Top>
          <Tag>요청시간 12:00</Tag>
          <Tag>결제완료 58,000원</Tag>
        </Top>

        <Menu>황금올리브 외 3건</Menu>
        <Tag style={{ textAlign: "start" }}>관악캠퍼스 919-A동</Tag>
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
  background-color: green;
  color: white;
`;

const Cancel = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  background-color: red;
  color: white;
`;

const Complete = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  padding: 0px 10px;
  background-color: green;
  color: white;
`;

const Delivery = styled.button`
  height: 60px;
  width: 60px;
  border: none;
  padding: 0px 10px;
  background-color: green;
  color: white;
`;

export default Card;
