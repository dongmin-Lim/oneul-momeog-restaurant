import { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import GroupAddModal from "./GroupAddModal";

function Main() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  return (
    <Div>
      메뉴관리페이지
      <GroupAddModal
        // value={value}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <GroupAdd onClick={() => setModalShow(true)}>그룹 추가</GroupAdd>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>그룹1</Accordion.Header>
          <Accordion.Body>메뉴1</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>그룹2</Accordion.Header>
          <Accordion.Body>메뉴2</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Div>
  );
}

const Modal = styled.div`
  width: 500px;
  margin: 0 auto;
`;

const Div = styled.div`
  width: 1320px;
  margin: 0 auto;
`;

const GroupAdd = styled.button``;
export default Main;
