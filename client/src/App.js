import Home from "./pages/Home";
import Lang from "./pages/Lang";
import Frame from "./pages/Frame";
import Git from "./pages/Git";
import Major from "./pages/Major";
import Footer from "./components/Footer";
import "./App.css";
import "./css/header.css";
import "./css/home.css";
import "./css/footer.css";
import "./css/lang.css";
import "./css/frame.css";
import { Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/Lang" component={Lang} />
        <Route path="/Frame" component={Frame} />
        <Route path="/Git" component={Git} />
        <Route path="/Major" component={Major} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </Provider>
  );
}

export default App;
