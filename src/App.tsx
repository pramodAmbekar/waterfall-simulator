import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Pages/Header"
import ButtonAppBar from "./Components/NavBar";
import ResumeBuilderCenter from "./Pages/ResumeBuilder/ResumeBuilderCenter/ResumeBuilderCenter.container";

function App() {
  return (
    <div className="App">
      <ButtonAppBar/>
      <BrowserRouter>
        {/* <Route path="/" exact component={Header} /> */}
        {/* <Route path="/button" exact component={ButtonAppBar}/> */}
        <Route path="/" exact component={ResumeBuilderCenter}/>
      </BrowserRouter>
    </div>
  );
}

export default App;

