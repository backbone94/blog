import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

h1, h2 {
	color: ${(props) => props.theme.textColor};
	// color: rgb(2, 0, 0);
}

.headerContainer, .openMenu, .closeMenu {
	border-color: ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.bgColor};
}

.headerContainer {
	border-bottom-color: ${(props) => props.theme.textColor};
}

.footer {
	border-top-color: ${(props) => props.theme.textColor};
	background-color: ${(props) => props.theme.bgColor};
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
