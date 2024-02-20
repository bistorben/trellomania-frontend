import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        loginData,
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
      setLoggedIn(true);
    } catch (err) {
      console.log(err);
    }

    console.log("nice try");
    // e.target.reset();
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={emailHandler}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={passwordHandler}
        />
        <button>submit</button>
      </form>
    </>
  );
};

export default Login;
