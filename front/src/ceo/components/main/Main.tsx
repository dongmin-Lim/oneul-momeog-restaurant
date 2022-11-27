import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Complete from "./Complete";
import Delivery from "./Delivery";
import Wait from "./Wait";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";

function Main() {
  // const [reviewInfo, setReviewInfo] = useState();
  const EventSource = EventSourcePolyfill || NativeEventSource;

  useEffect(() => {
    // EventSource 로 Server Sent Event 를 호출하는 부분
    const eventSource = new EventSource("http://175.45.208.84:8081/api/ceo/sse/connect", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwt")}`,
      },
    });
    console.log(eventSource);

    eventSource.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      console.log(data.message);
    };

    eventSource.onopen = function () {
      // 연결 됐을 때
      console.log("connected");
    };
    eventSource.onerror = function (error: any) {
      // 에러 났을 때
      console.log("error" + JSON.stringify(error));
    };
    eventSource.onmessage = function (stream: any) {
      // 메세지 받았을 때
      const parsedData = JSON.parse(stream.data);
      console.log(parsedData);
    };
    return () => eventSource.close();
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
