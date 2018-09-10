import React, { Component } from 'react';
import Camera from 'react-html5-camera-photo';
import Scanner from './Scanner';
import Result from './Result';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      scanning: false,
      results: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this._onDetected = this._onDetected.bind(this);
    this._scan = this._scan.bind(this);
  }

  handleInputChange(evt) {
    // console.log(this.fileUpload.files[0]);
    this.setState({
      file: URL.createObjectURL(this.fileUpload.files[0]),
    })
  }

  onTakePhoto (dataUri) {
    // Do stuff with the dataUri photo...
    console.log(`takePhoto: ${dataUri}`);
  }

  askForMediaAccess() {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
          var video = document.querySelector('video');
          video.srcObject = mediaStream;
          video.onloadedmetadata = function(e) {
            video.play();
          };
          this._scan();
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
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
        <div><img className="App-picture" src={this.state.file}/></div>
        <div>
          <button onClick={this.askForMediaAccess}>{this.state.scanning ? 'Stop' : 'Start'}</button>
          <ul className="results">
            {this.state.results.map((result) => (<Result key={result.codeResult.code} result={result} />))}
          </ul>
          {this.state.scanning ? <Scanner onDetected={this._onDetected}/> : null}
        </div>
      </div>
    );
  }

  _scan() {
    this.setState({scanning: !this.state.scanning});
  }

  _onDetected(result) {
    console.log(`ON DETECT STATE: ${this.state.results}`);
    this.setState({results: this.state.results.concat([result])});
  }
}

export default App;
