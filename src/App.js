import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import Sidebar from "./Sidebar/Sidebar";
import Content from "./Content/Content";

class App extends Component {
  render() {
    return (
      <div id="wrapper">
        <Sidebar/>
        <Content></Content>
      </div>
    );
  }
}

export default App;
