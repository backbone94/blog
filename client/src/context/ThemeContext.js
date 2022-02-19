import { createContext } from "react";

const ThemeContext = createContext();

export default ThemeContext;

// const ThemeProvider = ({ children }) => {
//   const [ThemeMode, setThemeMode] = useState("light");
//   const themeObject = ThemeMode === "light" ? lightTheme : darkTheme;

//   return (
//     <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
//       <StyledProvider theme={themeObject}>{children}</StyledProvider>
//     </ThemeContext.Provider>
//   );
// };

// function useTheme() {
//   const context = useContext(ThemeContext);
//   const { ThemeMode, setThemeMode } = context;

//   const toggleTheme = useCallback(() => {
//     if (ThemeMode === "light") {
//       setThemeMode("dark");
//     } else {
//       setThemeMode("light");
//     }
//   }, [ThemeMode]);

//   return [ThemeMode, toggleTheme];
// }

// export { ThemeProvider, useTheme };
