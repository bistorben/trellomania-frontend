import "./Register.css";
import "../common.css";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbExclamationCircle } from "react-icons/tb";

import axios from "axios";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [err, setError] = useState({});
  const [validationCounter, setValidationCounter] = useState(0);
  const emailInputRef = useRef(null);
  const userNameInputRef = useRef(null);

  useEffect(() => {
    if (submitted) return;

    if (err.field === "userName") {
      userNameInputRef.current.focus();
    } else if (err.field === "email") {
      emailInputRef.current.focus();
    }
  }, [err.field, validationCounter, submitted]);

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
      setValidationCounter(validationCounter + 1);
      setError(err.response.data);
      console.log(err.response ? err.response.data : err);
    }
  };

  useEffect(() => {
    const allInputsFilled = userName.length > 1 && email && password.length > 7;

    const validEmail = emailInputRef.current.checkValidity();

    setIsFormValid(allInputsFilled && validEmail);
  }, [userName, email, password]);
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
      <section className="Register wrapper-form-section">
        {!submitted ? (
          <>
            <h1>Sign up for your account</h1>
            <form onSubmit={submitHandler}>
              <input
                type="text"
                placeholder="User name*"
                id="userName"
                value={userName}
                onChange={userNameHandler}
                required
                minLength={2}
                ref={userNameInputRef}
              />
              <input
                type="email"
                placeholder="E-mail*"
                value={email}
                onChange={emailHandler}
                ref={emailInputRef}
                required
              />
              <input
                type="password"
                placeholder="Password*"
                value={password}
                onChange={passwordHandler}
                required
                // just for testing cases very short
                minLength={3}
              />

              <button className={isFormValid ? "btn-valid" : "btn-invalid"}>
                Continue
              </button>
              <Link to="/login">Already have an account? Log In</Link>
              {err.message && (
                <div className="err-wrapper">
                  <TbExclamationCircle />

                  <p>{err.message}</p>
                </div>
              )}
            </form>
          </>
        ) : (
          <>
            <h1>You have successfully registered</h1>
            <p>
              Welcome to Trellomania, the ultimate to-do app where productivity
              meets fun! 🌟 Your registration is the first step on a thrilling
              journey to conquer your tasks like never before. Let's get started
              and make things happen in Trellomania style!
            </p>
            <Link to="/login">Log in to dive in!</Link>
          </>
        )}
      </section>
      <div id="ballons">
        <img src="/luftballon.jpg" alt="" />
      </div>
    </>
  );
};

export default Register;
