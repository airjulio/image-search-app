import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode, faTshirt } from '@fortawesome/free-solid-svg-icons';

import Lightbox from 'react-images';


library.add(faBarcode);
library.add(faTshirt);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      scanning: false,
      pictureResult: [],
      barCodeResult: '',
    };
    this.handleBarcodeChange = this.handleBarcodeChange.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);
    this.showBarcode = this.showBarcode.bind(this);
    this.showResult = this.showResult.bind(this);
    this.showProducts = this.showProducts.bind(this);
    this._onDetected = this._onDetected.bind(this);
    this._scan = this._scan.bind(this);
  }

  handleBarcodeChange(evt) {
    const file = this.barUpload.files[0];
    this.barcodeRequest(file);
    this.setState({
      file: URL.createObjectURL(file),
    });
  }

  handlePicChange(evt) {
    this.pictureService(
      this.picUpload.files[0],
      'https://imagesearch.adeptmind.ai/image',
    );
    this.setState({
      file: URL.createObjectURL(this.picUpload.files[0]),
    });
  }

  showBarcode(response) {
    response.json().then((body) => {
      console.log('BODY', body);
      this.setState({ barCodeResult: body.result });
    });
  }


  pictureService(img, url) {
    this.setState({ pictureResult: 'Analyzing image...' });
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
          console.log('body', body.result);
          this.setState({ pictureResult: body.result });
          this.setState({ lightboxIsOpen: true });
          console.log(this);
        }),
      )
      .catch((error) => console.error('Error:', error));
  }

  barcodeRequest(img) {
    this.setState({ barCodeResult: 'Analyzing image...' });
    const formData = new FormData();
    formData.append('file', img);
    fetch('https://imagesearch.adeptmind.ai/barcode', {
      method: 'POST',
      mode: 'cors', // no-cors, cors, *same-origin
      body: formData,
    })
      .then((response) =>
        response.json().then((body) => {
          console.log('body', body.result);
          // this.setState({ barCodeResult: body.result });
        }),
      )
      .catch((error) => console.error('Error:', error));
  }

  showResult() {
    console.log('state', {
      ...this.state,
    });
    if (this.state.barCodeResult) {
      return <p>{this.state.barcodeResult}</p>;
    } else if (this.state.pictureResult) {
      return (
        <ul>
          {this.state.pictureResult.map((item) => {
            return <li>{item}</li>;
          })}
        </ul>
      );
    }
  }

  showProducts(products) {

    return (
        <div>
          {products.map((item) => {
            return <img className="App-product" src={item} />;
          })}
        </div>
    );
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
            ref={(ref) => (this.barUpload = ref)}
            type="file"
            accept="image/*"
            capture="camera"
            className="inputfile"
          />
          <label className="barcodeIcon" htmlFor="barcode-upload">
            <FontAwesomeIcon icon="barcode" />
          </label>

          <input
            id="picture-upload"
            onChange={this.handlePicChange}
            ref={(ref) => (this.picUpload = ref)}
            type="file"
            accept="image/*"
            capture="camera"
            className="inputfile"
          />
          <label className="shirtIcon" htmlFor="picture-upload">
            <FontAwesomeIcon icon="tshirt" />
          </label>
        </p>
        <div>
          <img className="App-picture" src={this.state.file} />
        </div>
        {Array.isArray(this.state.pictureResult) && this.state.pictureResult.length > 0 && (
            <Lightbox
              images={this.state.pictureResult}
              // isOpen={this.state.lightboxIsOpen}
              // onClickPrev={this.gotoPrevious}
              // onClickNext={this.gotoNext}
              onClose={() => {console.log(this)}}
          />
        )}
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
