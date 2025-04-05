import React, { useState } from "react";
import "./Register.css";
import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios for making API calls

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null); // For handling errors
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    
    const userData = { name: username, email: email, user_password: password, user_image_url: ""};

    try {
      // Making a POST request to the API
      const response = await axios.post("http://127.0.0.1:8000/api/users", userData);
      
      // On successful registration, redirect to the homepage or login page
      console.log(response.data);
      navigate("/"); // Redirect to homepage
    } catch (error) {
      // Handling errors
      if (error.response) {
        // If the server responds with an error (e.g., validation errors)
        setError(error.response.data.errors);
      } else {
        // If no response from the server
        setError("An error occurred while registering. Please try again later.");
      }
    }
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

        {error && <div className="error-message">{JSON.stringify(error)}</div>} {/* Displaying error messages if any */}

        <div className="forgot-password">
          Lost password? <span>Click here!</span>
        </div>

        <div className="submit-container">
          <button type="submit" className="submit">Register</button>
          <Link to="/login">
            <button type="button" className="submit">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
