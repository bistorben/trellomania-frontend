const Register = () => {
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submitted");
    const password = e.target.elements.password;
    console.log(password);
    password.type = "text";
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="e-mail" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button>submit</button>
      </form>
    </>
  );
};

export default Register;
