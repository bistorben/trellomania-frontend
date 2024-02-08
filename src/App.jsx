import { Outlet } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation.jsx";

function App() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default App;
