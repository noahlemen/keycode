import React, { Component } from 'react';
import './App.css';
import CopyToClipboard from 'react-copy-to-clipboard';
import { TransitionMotion, spring, presets } from 'react-motion';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);

    this.state = { keyEventStack: [] };
  }

  handleKeyDown(event) {
    const { keyEventStack } = this.state;

    console.log(event);

    const newEvent = {
      keyName: event.key === ' ' ? 'Space' : event.key,
      keyCode: event.keyCode,
      hash: Math.random().toString(36).substring(7)
    };

    this.setState({
      keyEventStack: [ newEvent, ...keyEventStack.splice(0, 10) ]
    });

    event.preventDefault();
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  getDefaultStyles() {
    return this.state.keyEventStack.map(
      event => ({ ...event, style: { height: 0, opacity: 1 } })
    );
  }

  getStyledList() {
    const { keyEventStack } = this.state;
    return keyEventStack.map((event, i) => {
      return {
        data: { ...event },
        key: event.hash,
        style: {
          height: spring(60, presets.wobbly),
          opacity: spring(1, presets.stiff)
        }
      };
    });
  }

  willEnter() {
    return { height: 0, opacity: 0 };
  }

  willLeave() {
    return { height: spring(0), opacity: spring(0) };
  }

  render() {
    return (
      <div className="App">
        <h1>what key code?</h1>
        <h3>press a key to find out</h3>
        <h5>click to copy key code</h5>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyledList()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {styles => (
              <div>
                {styles.map(
                    ({ key, style, data: { keyCode, keyName } }, index) => (
                      <div style={style} key={key}>
                        <CopyToClipboard text={keyCode}>
                          <div
                            className="keyInfo"
                            style={{ opacity: 1 / (index + 1) }}
                          >
                            <span className="code">{keyCode}</span>
                            <span className="key">"{keyName}"</span>
                          </div>
                        </CopyToClipboard>
                      </div>
                    )
                  )}
              </div>
            )}
        </TransitionMotion>
      </div>
    );
  }
}

export default App;
