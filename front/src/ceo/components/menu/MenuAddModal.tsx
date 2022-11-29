import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Rate } from "antd";

function MenuAddModal(props: any) {
  const [menuName, setGroupName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [menuImage, setMenuImage] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  async function onSubmit() {
    try {
      const response = await axios.post(`/api/ceo/menus/menu/add`, {
        restaurantId: sessionStorage.getItem("restaurantId"),
        groupId: props.groupId,
        menuName,
        description,
        price,
        menuImage,
        ingredients,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">메뉴그룹 추가</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          placeholder="메뉴이름"
          onChange={(e) => setGroupName(e.target.value)}
        ></input>
        <input placeholder="가격" onChange={(e) => setGroupName(e.target.value)}></input>
        <input
          placeholder="이미지"
          onChange={(e) => setGroupName(e.target.value)}
        ></input>
        <input
          placeholder="메뉴설명"
          onChange={(e) => setGroupName(e.target.value)}
        ></input>
        <input placeholder="성분" onChange={(e) => setGroupName(e.target.value)}></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmit}>
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MenuAddModal;
