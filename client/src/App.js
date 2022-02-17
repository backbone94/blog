import "./App.css";

// 카테고리
// 컴포넌트
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Category from "./components/Category";
import Folder from "./components/Folder";
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
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/:category/:folder/WritePost"
            component={WritePost}
          />
          <Route exact path="/:category/:folder" component={Folder} />
          <Route exact path="/:category" component={Category} />
        </Switch>
      </Provider>
      <Footer />
    </>
  );
};

export default App;
