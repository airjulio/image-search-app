import React, { Component } from 'react';
// import Camera from 'react-html5-camera-photo';
import Scanner from './Scanner';
import Result from './Result';
import logo from './logo.svg';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faTshirt } from '@fortawesome/free-solid-svg-icons';

library.add(faBarcode);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      scanning: false,
    };
    this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
    this._onDetected = this._onDetected.bind(this);
    this._scan = this._scan.bind(this);
  }

  handleBarcodeChange(evt) {
    this.barcodeRequest(this.fileUpload.files[0]);
    this.setState({
      file: URL.createObjectURL(this.fileUpload.files[0]),
    });
  }

  handlePicChange(evt) {
    this.pictureService(this.fileUpload.files[0], 'https://imagesearch.adeptmind.ai/image');
    this.setState({
      file: URL.createObjectURL(this.fileUpload.files[0]),
    });
  }

  showBarcode(response) {
    response.json().then((body) => {
      console.log(`BODY: ${JSON.stringify(body)}`);
      this.setState({ barCodeResult: body.result });
    })
  }

  pictureService(img, url, callback) {
    this.setState({ barCodeResult: 'Analysing image...' });
    const formData = new FormData();
    formData.append('file', img);
    fetch(url, {
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


  barcodeRequest(img) {
    this.setState({ barCodeResult: 'Analysing image...' });
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
              id="barcode-upload"
            onChange={this.handleBarcodeChange}
            ref={(ref) => (this.fileUpload = ref)}
            type="file"
            accept="image/*"
            capture="camera"
            className="inputfile"
          />
          <label className="barcodeIcon" for="barcode-upload"><FontAwesomeIcon icon="barcode" /></label>

          <input
              id="picture-upload"
              onChange={this.handlePicChange}
              ref={(ref) => (this.fileUpload = ref)}
              type="file"
              accept="image/*"
              capture="camera"
              className="inputfile"
          />
          <label className="shirtIcon" htmlFor="picture-upload"><FontAwesomeIcon icon="tshirt"/></label>
        </p>
        <div>
          <img className="App-picture" src={this.state.file} />
        </div>
        <div>
          <p>{this.state.barCodeResult}</p>
        </div>
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
