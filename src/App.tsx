import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Pages/Header"
import ButtonAppBar from "./Components/NavBar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Header} />
        <Route path="/button" exact component={ButtonAppBar}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

