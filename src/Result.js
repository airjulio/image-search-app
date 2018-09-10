import React from 'react';

export default class App extends React.Component {

  render() {
    const result = this.props.result;

    if (!result) {
      return null;
    }
    return (
        <li>
          {result.codeResult.code} [{result.codeResult.format}]
        </li>
    );
  }
};
