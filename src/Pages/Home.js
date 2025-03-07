import React from 'react';
import "./Home.css";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-purple-600">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800">Welcome Home</h1>
      </div>
    </div>
  );
};

export default Home;
