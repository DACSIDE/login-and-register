import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VideoCall from "./Pages/VideoCall";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <Router>
      <Routes>
        
        {!isLogin && (
          <>
            <Route path="/login" element={<Login setIsLogin={setIsLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {isLogin && (
          <>
            <Route path="/" element={<VideoCall />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
