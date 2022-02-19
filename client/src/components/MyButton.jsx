import styled from "styled-components";

export default function MyButton({ text }) {
  return <Button>{text}</Button>;
}

const Button = styled.button`
  border-radius: 20%;
  font-size: 25px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};
`;
