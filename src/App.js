import React, { Component } from 'react';
// import Camera from 'react-html5-camera-photo';
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
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this._onDetected = this._onDetected.bind(this);
    this._scan = this._scan.bind(this);
  }

  handleInputChange(evt) {
    this.barcodeRequest(this.fileUpload.files[0]);
    this.setState({
      file: URL.createObjectURL(this.fileUpload.files[0]),
    });
  }

  barcodeRequest(img) {
    const formData = new FormData();
    formData.append('file', img);
    fetch('https://imagesearch.adeptmind.ai/barcode', {
      // fetch('http://localhost:5000/barcode', {
      method: 'POST',
      mode: 'cors', // no-cors, cors, *same-origin
      body: formData,
    })
      .then((response) =>
        response.json().then((body) => {
          console.log(`BODY: ${JSON.stringify(body)}`);
          this.setState({ barCodeResult: body.result });
        }),
      )
      .catch((error) => console.error('Error:', error));
  }

  onTakePhoto(dataUri) {
    // Do stuff with the dataUri photo...
    console.log(`takePhoto: ${dataUri}`);
  }

  askForMediaAccess() {
    const constraints = { audio: true, video: { width: 1280, height: 720 } };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function(mediaStream) {
        // var video = document.querySelector('video');
        // video.srcObject = mediaStream;
        // video.onloadedmetadata = function(e) {
        //   video.play();
        // };
        this._scan();
      })
      .catch(function(err) {
        console.log(err.name + ': ' + err.message);
      }); // always check for errors at the end.
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Adept Image Search</h1>
        </header>
        <p className="App-intro">
          <input
            onChange={this.handleInputChange}
            ref={(ref) => (this.fileUpload = ref)}
            type="file"
            accept="image/*"
            capture="camera"
          />
          {/*<Camera*/}
          {/*onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }*/}
          {/*/>*/}
        </p>
        <div>
          <img className="App-picture" src={this.state.file} />
        </div>
        <div>
          <p>{this.state.barCodeResult}</p>
        </div>
        {/*<div>*/}
          {/*<button onClick={this._scan}>*/}
            {/*{this.state.scanning ? 'Stop' : 'Start'}*/}
          {/*</button>*/}
          {/*<ul className="results">*/}
            {/*{this.state.results.map((result) => (*/}
              {/*<Result key={result.codeResult.code} result={result} />*/}
            {/*))}*/}
          {/*</ul>*/}
          {/*{this.state.scanning ? (*/}
            {/*<Scanner onDetected={this._onDetected} />*/}
          {/*) : null}*/}
        {/*</div>*/}
      </div>
    );
  }

  _scan() {
    this.setState({ scanning: !this.state.scanning });
  }

  _onDetected(result) {
    this.setState({ results: this.state.results.concat([result]) });
  }
}

export default App;
