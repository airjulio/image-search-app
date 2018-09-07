import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log(`takePhoto: ${dataUri}`);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <input type="file" accept="image/*" capture="camera" />
          {/*<Camera*/}
              {/*onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }*/}
          {/*/>*/}
        </p>
      </div>
    );
  }
}

export default App;
