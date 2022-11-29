import axios from "axios";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import GroupAddModal from "./GroupAddModal";
import MenuAddModal from "./MenuAddModal";
import MenuEditModal from "./MenuEditModal";

function Main() {
  const [groupModalShow, setGroupModalShow] = useState<boolean>(false);
  const [menuAddModalShow, setMenuAddModalShow] = useState<boolean>(false);
  const [menuEditModalShow, setMenuEditModalShow] = useState<boolean>(false);
  const [fullMenu, setFullMenu] = useState<any>([]);
  const [groupId, setGroupId] = useState<number>();
  const [menuId, setMenuId] = useState<any>();

  useEffect(() => {
    async function getRestaurantMenus() {
      const response = await axios.get(
        `/api/ceo/${sessionStorage.getItem("restaurantId")}/menus/management`
        // `/mockdata/Menus.json`
      );
      console.log(response.data.data);
      setFullMenu(response.data.data);
    }
    getRestaurantMenus();
  }, []);

  function soldoutHandler() {}

  function editHandler() {}

  function deleteHandler() {}

  return (
    <Div>
      메뉴관리페이지
      <GroupAddModal show={groupModalShow} onHide={() => setGroupModalShow(false)} />
      <MenuAddModal
        groupid={groupId}
        show={menuAddModalShow}
        onHide={() => setMenuAddModalShow(false)}
      />
      <MenuEditModal
        menuid={menuId}
        groupid={groupId}
        show={menuEditModalShow}
        onHide={() => setMenuEditModalShow(false)}
      />
      <GroupAdd onClick={() => setGroupModalShow(true)}>그룹 추가</GroupAdd>
      <Accordion>
        {fullMenu?.map((groups: any, index: number) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              {groups.groupName}
              <MenuAdd
                onClick={(e) => (
                  e.stopPropagation(),
                  setMenuAddModalShow(true),
                  setGroupId(groups.groupId)
                )}
              >
                메뉴 추가
              </MenuAdd>
            </Accordion.Header>
            {groups.menus?.map((menu: any, index: number) => (
              <Accordion.Body key={index}>
                <div>
                  <img
                    src={`http://175.45.208.84:8080/api/image?imageUrl=${menu.menuImage}`}
                    alt={menu.menuName + "_img"}
                  ></img>
                  {menu.menuName}
                  {menu.price.toLocaleString("ko-KR")}원
                  <button onClick={soldoutHandler}>품절</button>
                  <button
                    onClick={(e) => (
                      editHandler(),
                      e.stopPropagation(),
                      setMenuEditModalShow(true),
                      setMenuId(menu.menuId)
                    )}
                  >
                    수정
                  </button>
                  <button onClick={deleteHandler}>삭제</button>
                </div>
              </Accordion.Body>
            ))}
          </Accordion.Item>
        ))}
      </Accordion>
    </Div>
  );
}

const Div = styled.div`
  width: 900px;
  margin: 0 auto;
`;

const GroupAdd = styled.button``;
const MenuAdd = styled.button``;
export default Main;
