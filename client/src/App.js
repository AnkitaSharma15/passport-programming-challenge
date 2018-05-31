import React, { Component } from 'react';
import NavBar from  "./components/NavBar/index";
import ParentFactory from "./components/ParentFactory/index"; 

class App extends Component {
  render() {
    return (
      <div>
      <NavBar />
      <ParentFactory/>
      </div>
    );
  }
}

export default App;
