import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
