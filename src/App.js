import React, { Component } from 'react';
import './App.css';
import { TransitionMotion, spring, presets } from 'react-motion';
import KeyInfo from './KeyInfo';
import keycode from 'keycode';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { keyEventStack: [] };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleKeyDown(event) {
    const { keyEventStack } = this.state;

    const newEvent = {
      keyName: keycode(event.keyCode),
      keyCode: event.keyCode,
      hash: Math.random().toString(36).substring(7)
    };

    this.setState({
      keyEventStack: [ newEvent, ...keyEventStack.splice(0, 10) ]
    });

    event.preventDefault();
  }

  componentDidMount() {
    this._div.focus();
  }

  componentWillMount() {
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick);
  }

  handleClick(event) {
    event.stopPropagation();
    this._div.focus();
  }

  getDefaultStyles() {
    return this.state.keyEventStack.map(
      event =>
        ({ key: '', data: { ...event }, style: { height: 0, opacity: 1 } })
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
      <div
        className="App"
        onKeyDown={this.handleKeyDown}
        ref={node => this._div = node}
        tabIndex="0"
      >
        <h1>what key code?</h1>
        <h3>press a key to find out</h3>
        <h5>click to copy key code to clipboard</h5>
        <TransitionMotion
          defaultStyles={this.getDefaultStyles()}
          styles={this.getStyledList()}
          willEnter={this.willEnter}
          willLeave={this.willLeave}
        >
          {styles => (
              <div>
                {styles.map(
                    (
                      { key, style, data: { keyCode, keyName, hash } },
                      index
                    ) => (
                      <div style={style} key={hash}>
                        <KeyInfo
                          keyCode={keyCode}
                          listIndex={index}
                          keyName={keyName}
                          copied={this.state.copiedHash === hash}
                          hash={hash}
                          onCopy={copiedHash => this.setState({ copiedHash })}
                        />
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
