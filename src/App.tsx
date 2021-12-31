import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import ButtonAppBar from "./Components/NavBar";
import OptionBar from "./Pages/OptionBar/optionBar.component";

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <BrowserRouter>
        <Route path="/" exact component={OptionBar} />
      </BrowserRouter>
    </div>
  );
}

export default App;
