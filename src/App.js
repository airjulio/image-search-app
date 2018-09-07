import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(evt) {
    // console.log(this.fileUpload.files[0]);
    this.setState({
      file: URL.createObjectURL(this.fileUpload.files[0])
    })
  }

  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log(`takePhoto: ${dataUri}`);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Adept Image Search</h1>
        </header>
        <p className="App-intro">
          <input onChange={this.handleInputChange} ref={(ref) => this.fileUpload = ref} type="file" accept="image/*" capture="camera" />
          {/*<Camera*/}
              {/*onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }*/}
          {/*/>*/}
        </p>
        <div><img src={this.state.file}/></div>
      </div>
    );
  }
}

export default App;
