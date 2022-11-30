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
      <h2>메뉴관리 페이지</h2>
      <GroupAddModal
        show={groupModalShow}
        setGroupModalShow={setGroupModalShow}
        onHide={() => setGroupModalShow(false)}
      />
      <MenuAddModal
        groupid={groupId}
        show={menuAddModalShow}
        setMenuAddModalShow={setMenuAddModalShow}
        onHide={() => setMenuAddModalShow(false)}
      />
      <MenuEditModal
        menu={menu}
        menuid={menuId}
        groupid={groupId}
        show={menuEditModalShow}
        setMenuEditModalShow={setMenuEditModalShow}
        onHide={() => setMenuEditModalShow(false)}
      />
      <GroupAdd onClick={() => setGroupModalShow(true)}>그룹 추가</GroupAdd>
      <Accordion>
        {fullMenu?.map((groups: any, index: number) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <AccordionHeaderWrapper>
              <div>{groups.groupName}</div>
              <MenuAdd
                onClick={(e) => (
                  e.stopPropagation(),
                  setMenuAddModalShow(true),
                  setGroupId(groups.groupId)
                )}
              >
                메뉴 추가
              </MenuAdd>
            </AccordionHeaderWrapper>
            {groups.menus?.map((menu: any, index: number) => (
              <Accordion.Body key={index}>
                <Container>
                  <Content>
                    <Img src="../data/img/menu.png" alt={menu.menuName + "_img"}></Img>
                    {menu.menuName}
                    {menu.price.toLocaleString("ko-KR")}원 현재상태 {menu.soldOut}
                  </Content>
                  <ButtonContent>
                    <MenuAdd
                      onClick={() =>
                        soldoutHandler(groups.groupId, menu.menuId, menu.soldOut)
                      }
                    >
                      판매/품절
                    </MenuAdd>
                    <MenuAdd
                      onClick={(e) => (
                        e.stopPropagation(),
                        setMenuEditModalShow(true),
                        setGroupId(groups.groupId),
                        setMenuId(menu.menuId),
                        getRestaurantMenus(groups.groupId, menu.menuId)
                      )}
                    >
                      수정
                    </MenuAdd>
                    <MenuAdd onClick={() => deleteHandler(groups.groupId, menu.menuId)}>
                      삭제
                    </MenuAdd>
                  </ButtonContent>
                </Container>
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
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div``;

const ButtonContent = styled.div``;

const AccordionHeaderWrapper = styled(Accordion.Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MenuAdd = styled.button`
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

const GroupAdd = styled.button`
  padding: 5px 10px;
  margin: 10px 0px;
  border: 1.5px solid black;
  border-radius: 10px;
  background-color: white;
  :hover {
    background-color: aliceblue;
  }
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

export default Main;
