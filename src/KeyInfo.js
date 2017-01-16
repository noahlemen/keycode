import React from 'react';
import './KeyInfo.css';
import CopyToClipboard from 'react-copy-to-clipboard';

const KeyInfo = (
  { keyCode, listIndex, keyName, copied, hash, onCopy, isNice }
) =>
  {
    const opacity = 1 / (listIndex + 1);

    return (
      <CopyToClipboard
        text={(keyCode || '').toString()}
        onCopy={() => onCopy(hash)}
      >
        <div
          className={copied ? 'keyInfo copied' : 'keyInfo'}
          style={{ opacity: opacity }}
        >
          {copied && <span>copied!</span>}
          {!copied && (
                <div>
                  <span className="code">{keyCode}</span>
                  <span className="key">"{keyName}"</span>
                </div>
              )}
          {isNice && (
                <div
                  className={
                    hash.charCodeAt(0) < 100 ? 'nice left' : 'nice right'
                  }
                  style={
                    {
                      fontSize: `${1 + hash.charCodeAt(4) / 127}em`,
                      transform: `rotate(${hash.charCodeAt(2) - 100}deg)`,
                      padding: `0 ${hash.charCodeAt(3) / 2}px`
                    }
                  }
                >
                  {hash.charCodeAt(1) < 120 ? 'nice' : 'noice'}
                </div>
              )}
        </div>
      </CopyToClipboard>
    );
  };

KeyInfo.propTypes = {
  keyCode: React.PropTypes.number,
  listIndex: React.PropTypes.number,
  keyName: React.PropTypes.string,
  copied: React.PropTypes.bool,
  hash: React.PropTypes.string,
  onCopy: React.PropTypes.func,
  isNice: React.PropTypes.bool
};

export default KeyInfo;
