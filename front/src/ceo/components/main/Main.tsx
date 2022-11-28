import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Finish from "./Finish";
import Delivery from "./Delivery";
import Receive from "./Receive";
import { EventSourcePolyfill } from "event-source-polyfill";

export interface receiveProps {
  deliveryLocation: string;
  exMenu: string;
  readyTime: string;
  restaurantId: number;
  roomId: number;
  status: string;
  totalPrice: number;
}

function Main() {
  const [status, setStatus] = useState<boolean>(false);
  const [receiveArr, setReceiveArr] = useState<receiveProps[]>([]);
  const [deliveryArr, setDeliveryArr] = useState<receiveProps[]>([]);
  const [finishArr, setFinishArr] = useState<receiveProps[]>([]);

  useEffect(() => {
    console.log(deliveryArr);
  }, [deliveryArr]);

  useEffect(() => {
    async function statusHandler() {
      const response = await axios.get(`/api/ceo/main/restaurant/1`);
      console.log(response.data.data);
      setReceiveArr(response.data.data.ready);
      setDeliveryArr(response.data.data.receive);
      setFinishArr(response.data.data.delivery);
    }
    statusHandler();
  }, []);

  useEffect(() => {
    // EventSource 로 Server Sent Event 를 호출하는 부분
    const eventSource = new EventSourcePolyfill(
      "http://localhost:8081/api/ceo/sse/connect",
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
        heartbeatTimeout: 120000,
      }
    );

    console.log(eventSource);

    eventSource.addEventListener("ready", (e: any) => {
      const newElement = document.createElement("li");
      console.log(JSON.parse(e.data));
      setReceiveArr([...receiveArr, JSON.parse(e.data)]);
      newElement.textContent = `message: ${e.data}`;
    });

    eventSource.addEventListener("connect", (e: any) => {
      const newElement = document.createElement("li");
      console.log("e.data = ", e.data);
      newElement.textContent = `message: ${e.data}`;
    });

    eventSource.onopen = function () {
      // 연결 됐을 때
      console.log("connected");
    };

    eventSource.onerror = function (error) {
      // 에러 났을 때
      console.log("error" + JSON.stringify(error));
    };

    eventSource.onmessage = function (stream) {
      // 메세지 받았을 때
      const parsedData = JSON.parse(stream.data);
      console.log(parsedData);
    };
  }, []);

  return (
    <Div>
      <Receive
        receiveArr={receiveArr}
        setReceiveArr={setReceiveArr}
        deliveryArr={deliveryArr}
        setDeliveryArr={setDeliveryArr}
        finishArr={finishArr}
        setFinishArr={setFinishArr}
      />
      <Delivery
        receiveArr={receiveArr}
        setReceiveArr={setReceiveArr}
        deliveryArr={deliveryArr}
        setDeliveryArr={setDeliveryArr}
        finishArr={finishArr}
        setFinishArr={setFinishArr}
      />
      <Finish
        receiveArr={receiveArr}
        setReceiveArr={setReceiveArr}
        deliveryArr={deliveryArr}
        setDeliveryArr={setDeliveryArr}
        finishArr={finishArr}
        setFinishArr={setFinishArr}
      />
    </Div>
  );
}

const Div = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 50px;
  width: 1320px;
  text-align: center;
  margin: 0 auto;
`;

export default Main;
