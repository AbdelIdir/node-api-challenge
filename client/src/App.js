import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import "./App.css";

function App() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    fetch("/api/landing?name=coldude")
      .then(res => res.json())
      .then(greeting => setGreeting(greeting), console.log(greeting))
      .catch(err => {
        console.log("catch", err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>hey {greeting}</p>
      </header>
    </div>
  );
}

export default App;
