import React from 'react';
import './KeyInfo.css';
import CopyToClipboard from 'react-copy-to-clipboard';

const KeyInfo = ({ keyCode, listIndex, keyName, copied, hash, onCopy }) => {
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
        {copied && <span>copied!</span> || (
              <div>
                <span className="code">{keyCode}</span>
                <span className="key">"{keyName}"</span>
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
  onCopy: React.PropTypes.func
};

export default KeyInfo;
