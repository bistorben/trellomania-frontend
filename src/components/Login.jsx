import "./Login.css";
import "../common.css";
import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { TbExclamationCircle } from "react-icons/tb";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [err, setErr] = useState("");
  const emailInputRef = useRef(null);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/dashboard");
    }
  }, [loggedIn, navigate]);

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

      console.log("loggedIn nach setMethode", loggedIn);
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err);
    }

    console.log("nice try");
    // e.target.reset();
  };

  useEffect(() => {
    setIsFormValid(
      emailInputRef.current.checkValidity() && password.length > 0
    );
  }, [email, password]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <section className="Login wrapper-form-section ">
      <h1>Log in to your account</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={emailHandler}
          required
          ref={emailInputRef}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordHandler}
          required
        />
        <button className={isFormValid ? "btn-valid" : "btn-invalid"}>
          Log in
        </button>
        <Link to="/register">No Account? Please register!</Link>
        {err && (
          <div className="err-wrapper">
            <TbExclamationCircle />
            <p>{err}</p>
          </div>
        )}
      </form>
    </section>
  );
};

export default Login;
