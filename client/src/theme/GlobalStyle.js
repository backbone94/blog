import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
h2 {
	color: ${(props) => props.theme.textColor};
}
.headerContainer {
	border-bottom-color: ${(props) => props.theme.textColor};
}
.footer {
	border-top-color: ${(props) => props.theme.textColor};
}
#root {
	font-family: "Gamja Flower", cursive;
	background-color: ${(props) => props.theme.bgColor};
	color: ${(props) => props.theme.textColor};
}
a {
	color: ${(props) => props.theme.textColor};
}
a:hover {
  color: ${(props) => props.theme.textColor};
}
.postTitle {
  color: ${(props) => props.theme.textColor};
}
`;

export default GlobalStyle;
