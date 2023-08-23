import "./App.css";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Post from "./components/Post";
import Department from "./pages/Department";
import Nav from "./components/Nav";
import React from "react";
const App: React.FC = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/department" element={<Department />} />
          <Route path="/posts" element={<Post />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
