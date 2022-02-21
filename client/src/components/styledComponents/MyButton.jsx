import styled from "styled-components";

export default function MyButton({
  text,
  onClick,
  marginLeft,
  marginRight,
  className,
}) {
  return (
    <Button
      className={className}
      style={{ marginLeft, marginRight }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

const Button = styled.button`
  border-radius: 10%;
  font-size: 18px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  border: ${(props) => props.theme.borderColor};
  transition: all 0.2s;
  &:hover {
    background-color: #a0a0a090;
  }
`;
