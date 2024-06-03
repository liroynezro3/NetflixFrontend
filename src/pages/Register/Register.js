import axios from "axios";
import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import classes from "./Register.module.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const history = useHistory();

  const handleFinish = async (e) => {
    e.preventDefault();
    if(email.includes("@")&&email.length>5&&password.length>5&&username.length>5){
      try {
        await axios.post(`${process.env.REACT_APP_NETFLIXBACKEND}/auth/registar`, {email, username,password });
        alert("Registration successful")
        history.push("/login");
      } catch (err) {
        alert("Something is wrong, please try other details")
      }
    }
    else{
      return alert("Please fill in correct details, you need:correct email , password longer then 5 numbers, username longer then 5 letters")
    }
  };
  return (
    <div className={classes.register}>
      <div className={classes.top}>
        <div className={classes.wrapper}>
          <img
            className={classes.logo}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Logonetflix.png/800px-Logonetflix.png?20170904093427"
            alt=""
          />
          <button className={classes.loginbutton} onClick={()=>history.push("/login")}>Sign In</button>
        </div>
      </div>
      <div className={classes.container}>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch Anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!toggle ? (
          <div className={classes.input}>
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <button className={classes.registerButton} onClick={()=>{setToggle(true)}}>
              Get Started
            </button>
          </div>
        ) : (
          <>
          <div className={classes.inputregistar}>
              <br></br>
            <input type="text" placeholder="Username" autoCorrect="false" onChange={(e)=>setUsername(e.target.value)} />
            <input type="password" placeholder="password"  onChange={(e)=>setPassword(e.target.value)} />
            <button className={classes.registerButton} onClick={handleFinish}>
              Start
            </button>
          </div>
          <button onClick={()=>{setToggle(false)}} className={classes.backtomail}>Return to the registration page</button>
          </>
        )}

      </div>
    </div>
  );
};

export default Register;
