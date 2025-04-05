import React, { useState } from "react";
import "./LoginSignup.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png"; 

const LoginSignup = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLogin(true);
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">Sign Up</div>
        <div className="underline"></div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="inputs">
          <div className="input">
            <img src={email_icon} alt="Email Icon" />
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <img src={password_icon} alt="Password Icon" />
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="input">
            <img src={user_icon} alt="User Icon" />
            <input 
              type="text" 
              placeholder="Enter your username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="forgot-password">
          Lost password? <span>Click here!</span>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit">Sign Up</button>
          <button type="button" className="submit" onClick={() => setIsLogin(false)}>Log In</button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
