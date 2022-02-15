import "./App.css";

// 카테고리
import Frame from "./components/category/Frame";
import Git from "./components/category/Git";
import Major from "./components/category/Major";
import Language from "./components/category/Language";

// 컴포넌트
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LangDetail from "./components/LangDetail";
import WritePost from "./components/WritePost";

import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
  return (
    <>
      <Header />
      <Provider store={store}>
        <Switch>
          <Route exact path="/Lang/:id/WritePost" component={WritePost} />
          <Route exact path="/Lang/:id" component={LangDetail} />
          <Route exact path="/Lang" component={Language} />
          <Route exact path="/Frame" component={Frame} />
          <Route exact path="/Git" component={Git} />
          <Route exact path="/Major" component={Major} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Provider>
      <Footer />
    </>
  );
};

export default App;
