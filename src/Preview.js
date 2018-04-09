import React, { Component } from 'react';

// if you want to import svg inline - no need here
// import PlayerBack from './assets/back.inline.svg';
// <PlayerBack width={100} height={100} />

import './Play.css';

export default class Preview extends Component {
  render() {
    return (
      <div className="preview" >
        <img src="./assets/back.svg"
          alt="back"
          style={{
            height: 100,
            width: 100,
          }}
        />
      </div>
    );
  }
}
