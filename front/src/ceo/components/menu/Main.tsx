import axios from "axios";
import { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import styled from "styled-components";
import GroupAddModal from "./GroupAddModal";
import MenuAddModal from "./MenuAddModal";
import MenuEditModal from "./MenuEditModal";

function Main() {
  const [menu, setMenu] = useState<any>();
  const [groupModalShow, setGroupModalShow] = useState<boolean>(false);
  const [menuAddModalShow, setMenuAddModalShow] = useState<boolean>(false);
  const [menuEditModalShow, setMenuEditModalShow] = useState<boolean>(false);
  const [fullMenu, setFullMenu] = useState<any>([]);
  const [groupId, setGroupId] = useState<number>();
  const [menuId, setMenuId] = useState<number>();

  useEffect(() => {
    async function getRestaurantMenus() {
      const response = await axios.get(
        `/api/ceo/${sessionStorage.getItem("restaurantId")}/menus/management`
      );
      console.log(response.data.data);
      setFullMenu(response.data.data);
    }
    getRestaurantMenus();
  }, []);

  async function getRestaurantMenus(groupId: number, menuId: number) {
    const response = await axios.get(
      `/api/ceo/menus/menu/edit?restaurantId=${sessionStorage.getItem(
        "restaurantId"
      )}&groupId=${groupId}&menuId=${menuId}`
    );
    console.log(response.data.data);
    setMenu(response.data.data);
  }

  async function soldoutHandler(groupId: number, menuId: number, soldOut: boolean) {
    const response = await axios.patch(`/api/ceo/menus/menu/sold-out/edit`, {
      restaurantId: sessionStorage.getItem("restaurantId"),
      groupId,
      menuId,
      soldOut: !soldOut,
    });
  }

  async function deleteHandler(groupId: number, menuId: number) {
    const response = await axios.delete(
      `/api/ceo/menus/menu/delete?menuId=${menuId}&groupId=${groupId}`
    );
    console.log(response.data.data);
    // setFullMenu(response.data.data);
  }

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
        menu={menu}
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
                  {menu.price.toLocaleString("ko-KR")}원 현재상태 {menu.soldOut}
                  <button
                    onClick={() =>
                      soldoutHandler(groups.groupId, menu.menuId, menu.soldOut)
                    }
                  >
                    판매/품절
                  </button>
                  <button
                    onClick={(e) => (
                      e.stopPropagation(),
                      setMenuEditModalShow(true),
                      setGroupId(groups.groupId),
                      setMenuId(menu.menuId),
                      getRestaurantMenus(groups.groupId, menu.menuId)
                    )}
                  >
                    수정
                  </button>
                  <button onClick={() => deleteHandler(groups.groupId, menu.menuId)}>
                    삭제
                  </button>
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
