import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const registerData = {
      userName,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="user name"
          id="userName"
          value={userName}
          onChange={userNameHandler}
        />
        <input
          type="email"
          placeholder="e-mail"
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
      <Link to="/login">login</Link>
    </>
  );
};

export default Register;
