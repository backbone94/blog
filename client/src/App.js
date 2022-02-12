import Home from "./pages/Home";
import Lang from "./pages/Lang";
import Frame from "./pages/Frame";
import Git from "./pages/Git";
import Major from "./pages/Major";
import Footer from "./Footer";
import "./App.css";
import "./css/header.css";
import "./css/home.css";
import "./css/footer.css";
import "./css/lang.css";
import "./css/frame.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
        <Route path="/Lang" component={Lang} />
        <Route path="/Frame" component={Frame} />
        <Route path="/Git" component={Git} />
        <Route path="/Major" component={Major} />
        <Route path="/" component={Home} />
      </Switch>
      <Footer />
    </>
  );
}

export default App;
