import axios from "axios";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Rate } from "antd";

function GroupAddModal(props: any) {
  const [rating, setRating] = useState<number>();
  const [content, setContent] = useState<string>("");

  async function onSubmit() {
    try {
      const response = await axios.post(`/api/ceo/menus/group/add`, {
        // restaurantId,
        // groupName,
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
        <input onChange={(e) => setContent(e.target.value)}></input>

        <Rate />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onSubmit}>
          추가
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GroupAddModal;
