import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header.jsx";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext.jsx";
import WorkSpace from "./components/WorkSpace.jsx";

function App() {
  const { loggedIn } = useContext(AuthContext);

  return (
    <>
      <Header />
      {loggedIn ? (
        <>
          {" "}
          <div className="logged-in-wrapper">
            <WorkSpace />
            <main className="logged-in-main">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        <main>
          <Outlet />
        </main>
      )}
    </>
  );
}

export default App;
