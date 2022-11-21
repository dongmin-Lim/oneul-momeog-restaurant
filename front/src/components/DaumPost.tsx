// 주소입력창
import styled from "styled-components";
import DaumPostCode from "react-daum-postcode";
import { useEffect } from "react";

const DaumPostCodeWrapper = styled(DaumPostCode)`
  /* Positioning */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* Display & Box Model */
  box-shadow: 2px 3px 8px 0px rgb(150, 150, 150);
  padding: 30px;
  border: 0px solid black;
  border-radius: 20px;
  margin: 0 auto;

  /* Color */
  background-color: white;
`;

const DaumPost = ({ isPopupOpen, setIsPopupOpen, setNormalAddress, setZipcode }: any) => {
  useEffect(() => {
    document.body.style.cssText = `
          position: fixed;
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    //fullAddress -> 전체 주소반환
    setNormalAddress(fullAddress);
    setZipcode(data.zonecode);
    setIsPopupOpen(false);
  };
  return (
    <>
      {isPopupOpen ? (
        <div>
          <DaumPostCodeWrapper
            style={{ width: "500px", height: "700px" }}
            onComplete={handleComplete}
            className="post-code"
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
export default DaumPost;
