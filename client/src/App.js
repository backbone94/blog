import "./App.css";

// 컴포넌트
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Category from "./components/Category";
import Folder from "./components/Folder";
import WritePost from "./components/WritePost";
import SearchPost from "./components/SearchPost";
import DetailPost from "./components/DetailPost";
import UpdatePost from "./components/UpdatePost";
import MyProfile from "./components/MyProfile";

import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

// ThemeMode(다크모드) Context API
import { useCallback, useState } from "react";
import ThemeContext from "./context/ThemeContext";
import Toggle from "./components/styledComponents/Toggle";
import GlobalStyle from "./theme/GlobalStyle";
import { lightTheme, darkTheme } from "./theme/theme";
import { ThemeProvider } from "styled-components";

const App = () => {
  // 다크모드 관련 코드
  const LocalTheme = window.localStorage.getItem("theme") || "light";
  const [ThemeMode, setThemeMode] = useState(LocalTheme);
  const themeObject = ThemeMode === "light" ? lightTheme : darkTheme;
  const toggleTheme = useCallback(() => {
    if (ThemeMode === "light") {
      setThemeMode("dark");
      window.localStorage.setItem("theme", "dark");
    } else {
      setThemeMode("light");
      window.localStorage.setItem("theme", "light");
    }
  }, [ThemeMode]);

  const persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeContext.Provider value={{ ThemeMode, setThemeMode }}>
          <ThemeProvider theme={themeObject}>
            <GlobalStyle />
            <Toggle toggle={toggleTheme} mode={ThemeMode} />
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/myProfile" component={MyProfile} />
              <Route exact path="/searchPost" component={SearchPost} />
              <Route
                exact
                path="/:category/:folder/WritePost"
                component={WritePost}
              />
              <Route
                exact
                path="/:category/:folder/UpdatePost"
                component={UpdatePost}
              />
              <Route
                exact
                path="/:category/:folder/:postId"
                component={DetailPost}
              />
              <Route exact path="/:category/:folder" component={Folder} />
              <Route exact path="/:category" component={Category} />
            </Switch>
            <Footer />
          </ThemeProvider>
        </ThemeContext.Provider>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
};

export default App;
