import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Complete from "./Complete";
import Delivery from "./Delivery";
import Wait from "./Wait";
import { EventSourcePolyfill } from "event-source-polyfill";

function Main() {
  // const [reviewInfo, setReviewInfo] = useState();

  useEffect(() => {
    // EventSource 로 Server Sent Event 를 호출하는 부분
    const eventSource = new EventSourcePolyfill(
      "http://localhost:8081/api/ceo/sse/connect",
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
        },
      }
    );
    console.log(eventSource);

    eventSource.addEventListener("message", (e) => {
      const newElement = document.createElement("li");

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
      <Wait />
      <Complete />
      <Delivery />
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
