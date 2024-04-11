import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import React from "react";

import "./App.css";
import "./index.css"
import Blog from "./components/Blog";

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <Blog />
    </React.Fragment>
  );
}

export default App;
