import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

function Main() {
  const [notice, setNotice] = useState<string>();
  const [event, setEvent] = useState<string>();
  const [ingredientOrigin, setIngredientOrigin] = useState<string>();

  useEffect(() => {
    async function getManagementData() {
      const response = await axios.get(
        `http://localhost:8081/api/ceo/${sessionStorage.getItem(
          "restaurantId"
        )}/management`
      );
      console.log(response.data.data);
      setNotice(response.data.data.notice);
      setEvent(response.data.data.event);
      setIngredientOrigin(response.data.data.ingredientOrigin);
    }
    getManagementData();
  }, []);

  async function onEdit() {
    const response = await axios.put(
      `/api/ceo/${sessionStorage.getItem("restaurantId")}/management/edit`,
      {
        notice: notice,
        event,
        ingredientOrigin,
      }
    );
    console.log(response);
  }

  return (
    <Div>
      <h2>관리페이지</h2>
      <Container>
        <Header>
          <Title>공지</Title>
          <ButtonWrapper onClick={onEdit}>수정하기</ButtonWrapper>
        </Header>
        최대 100자
        <TextAreaWrapper
          maxLength={100}
          onChange={(e) => setNotice(e.target.value)}
          value={notice}
        ></TextAreaWrapper>
      </Container>
      <Container>
        <Header>
          <Title>한마디</Title>
          <ButtonWrapper onClick={onEdit}>수정하기</ButtonWrapper>
        </Header>
        최대 100자
        <TextAreaWrapper
          maxLength={100}
          onChange={(e) => setEvent(e.target.value)}
          value={event}
        ></TextAreaWrapper>
      </Container>
      <Container>
        <Header>
          <Title>원산지 정보</Title>
          <ButtonWrapper onClick={onEdit}>수정하기</ButtonWrapper>
        </Header>
        최대 100자
        <TextAreaWrapper
          maxLength={100}
          onChange={(e) => setIngredientOrigin(e.target.value)}
          value={ingredientOrigin}
        ></TextAreaWrapper>
      </Container>
    </Div>
  );
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 900px;
  margin: 0 auto;
  margin-top: 20px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h3``;
const ButtonWrapper = styled.button`
  padding: 5px 10px;
  margin-left: 10px;
  border: 1.5px solid black;
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0);
  color: black;
  :hover {
    background-color: #afdaff;
  }
`;
const TextAreaWrapper = styled.textarea`
  width: 600px;
  height: 200px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  /* border: 1px solid black; */
`;
export default Main;
