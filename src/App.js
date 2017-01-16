import React, { Component } from 'react';
import './App.css';
import CopyToClipboard from 'react-copy-to-clipboard';

class App extends Component {
  constructor(props) {
    super(props)

    this.handleKeyDown = this.handleKeyDown.bind(this)

    this.state = { keyEventStack: [] }
  }

  handleKeyDown(event) {
    const { keyEventStack } = this.state

    console.log(event);

    const newEvent = {
      key: event.key === ' ' ? 'Space' : event.key,
      keyCode: event.keyCode,
      hash: Math.random().toString(36).substring(7)
    }

    this.setState({ keyEventStack: [newEvent, ...keyEventStack.splice(0, 10)] })

    event.preventDefault();
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    const { keyEventStack } = this.state;

    return (
      <div className="App">
        <h1>what key code?</h1>
        <h3>press a key to find out</h3>
        {keyEventStack.map((event, index) =>  <CopyToClipboard text={event.keyCode}><div className="keyInfo" style={{ opacity: 1.5 / (index + 1) }} key={event.hash}><span className="code">{event.keyCode}</span><span className="key">"{event.key}"</span></div></CopyToClipboard>)}
      </div>
    );
  }
}

export default App;
