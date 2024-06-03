import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import classes from "./Login.module.css";
import { AuthContext } from "../../context/authContext/AuthContext";
import { login } from "../../context/authContext/apiCalls";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useContext(AuthContext);
  const history = useHistory();
  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password }, dispatch);
  };
  return (
    <div className={classes.login}>
      <div className={classes.top}>
        <div className={classes.wrapper}>
          <img
            className={classes.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427"
            alt=""
          />
        </div>
      </div>
      <div className={classes.container}>
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button className={classes.loginbutton} onClick={handleLogin}>
            Login
          </button>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/register");
            }}
          >
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by google recatcha to ensure you're not a
            bot. <b>Learn more</b>
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
