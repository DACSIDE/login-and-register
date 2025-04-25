import React, { useState } from "react";
import "./Login.css";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API calls

const Login = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
  
    const userData = { email: "john@example.com", password: "secretpassword" };
  
    try {
      // Making a POST request to the API for login
      const response = await axios.post("http://127.0.0.1:8000/api/login", userData);
  
      // Assuming the response contains a token or some login information
      console.log(response);
  
      // If login is successful, set the login state and redirect
      setIsLogin(true);
      navigate("/"); // Redirect to homepage or any page you prefer
    } catch (error) {
      if (error.response) {
        // If the server responds with an error (e.g., invalid credentials)
        setError(error.response.data.error || "Invalid credentials");
      } else if (error.request) {
        // If no response is received from the server
        setError("Network error. Please try again later.");
      } else {
        // Handle unexpected errors
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
  

  return (
    <div className="container">
      <div className="header">
        <div className="text">Log In</div>
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
        </div>

        {error && <div className="error-message">{error}</div>} {/* Displaying error message if any */}

        <div className="forgot-password">
          Lost password? <span>Click here!</span>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit">Log In</button>
          <Link to="/register" className="submit">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
