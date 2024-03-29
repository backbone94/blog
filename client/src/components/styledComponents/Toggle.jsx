import styled from "styled-components";

export default function Toggle({ toggle, mode }) {
  return (
    <ToggleWrapper onClick={toggle} mode={mode}>
      {mode === "dark" ? "🌞" : "🌛"}
    </ToggleWrapper>
  );
}

const ToggleWrapper = styled.span`
  position: absolute;
  left: 80%;
  top: 12%;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  transition: all 0.3s;
  &:hover {
    background-color: #a0a0a090;
    cursor: pointer;
  }

  @media screen and (max-width: 400px) {
    top: 20%;
    left: 70%;
  }
`;
