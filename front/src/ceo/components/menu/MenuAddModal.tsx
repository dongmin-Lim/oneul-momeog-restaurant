import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function MenuAddModal(props: any) {
  const [menuName, setGroupName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [menuImage, setMenuImage] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");

  async function onSubmit() {
    // 폼 데이터 생성
    const formData = new FormData();

    // 폼에 데이터를 첨부하기 위해서는 form.append('키값(필드)', 데이터) 를 이용한다.
    // 폼에 파일 첨부. 파일 첨부 같은 경우에는 반복문을 통해 append 해주어야 한다.(아래코드는 미적용)
    formData.append("menuImage", menuImage);

    // 폼에 텍스트 정보 첨부.
    // 텍스트 그대로 전송되기 때문에
    // Object를 보내기 위해서는 JSON 형식으로 보낸다.(현재는 미적용)
    formData.append("restaurantId", sessionStorage.getItem("restaurantId"));
    formData.append("groupId", props.groupid);
    formData.append("menuName", menuName);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("ingredients", ingredients);

    try {
      const response = await axios.post(`/api/ceo/menus/menu/add`, formData, {
        headers: { "Content-Type": "multipart/form-data", charset: "utf-8" },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    props.setAddModalShow(false);
  }

  // form-data에 이미지 전송을 위한 변수저장
  const onChangeImageInput = (e: any) => {
    setMenuImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

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
        <input
          placeholder="가격"
          onChange={(e) => setPrice(parseInt(e.target.value))}
        ></input>
        <input
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          multiple
          onChange={onChangeImageInput}
        />
        <input
          placeholder="메뉴설명"
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          placeholder="성분"
          onChange={(e) => setIngredients(e.target.value)}
        ></input>
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
