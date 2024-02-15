import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        loginData
      );
      console.log(response.data);
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
