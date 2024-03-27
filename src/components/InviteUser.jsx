import { useContext, useEffect, useState } from "react";
import "./InviteUser.css";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { useModal } from "../contexts/ModalContext.jsx";
import { useRef } from "react";

// eslint-disable-next-line react/prop-types
const InviteUser = ({ boardId }) => {
  const [email, setEmail] = useState("");
  const { authUser } = useContext(AuthContext);
  // quick solution for presentation
  const [sameUserMail, setSameUserMail] = useState(false);
  const { setIsOpen } = useModal();
  const inputRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email === authUser.email) {
      setSameUserMail(true);
      return;
    }
    if (email.trim().length > 0) {
      try {
        const response = await axios.patch(
          `${import.meta.env.VITE_API}/board/share`,
          { boardId, email: email },
          {
            withCredentials: true,
          }
        );
        setIsOpen(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    console.log();
  };

  return (
    <form className="InviteUser" onSubmit={submitHandler}>
      <h2>Share board</h2>
      <input
        type="email"
        placeholder="Email of user please..."
        onChange={emailHandler}
        value={email}
        ref={inputRef}
      />
      <button>share</button>
      {sameUserMail && <p>same mail as user</p>}
    </form>
  );
};

export default InviteUser;
