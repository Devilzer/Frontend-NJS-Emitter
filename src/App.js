import './style/App.scss';
import { useSelector } from "react-redux";
import Home from "./components/Home";
import Authentication from "./components/Authentication";
import "../node_modules/noty/lib/noty.css";
import "../node_modules/noty/lib/themes/nest.css";

function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  return (
    <div className="App">
      {isLoggedIn===false && <Authentication/>}
      {isLoggedIn===true && <Home/>}
    </div>
  );
};

export default App;
