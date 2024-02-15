import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [err, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const registerData = {
      userName,
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/user/register",
        registerData
      );
      setSubmitted(true);
      console.log(response.data);
    } catch (err) {
      setError(err.response.data.message);
      console.log(err.response ? err.response.data : err);
    }
  };
  // --------------------------------------------------------
  // ---------- version with fetch instead axios ------------
  // --------------------------------------------------------
  // const submitHandler = async (e) => {
  //   e.preventDefault();

  //   const registerData = {
  //     userName,
  //     email,
  //     password,
  //   };

  //   try {
  //     const response = await fetch("http://localhost:3000/user", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(registerData),
  //     });
  //     console.log(response);
  //     if (response.ok) {
  //       const data = await response.json();
  //       setSubmitted(true);
  //       console.log(data);
  //     } else {
  //       const data = await response.json();
  //       console.log(data);
  //     }
  //   } catch (err) {
  //     console.log("ich bin hier");
  //     console.log(err);
  //   }
  // };
  // --------------------------------------------------------
  // --------------------------------------------------------
  // --------------------------------------------------------

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
      {!submitted ? (
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
          <p>{err}</p>
        </form>
      ) : (
        <>
          <h2>YEAH</h2>
          <Link to="/login">login</Link>
        </>
      )}
    </>
  );
};

export default Register;
