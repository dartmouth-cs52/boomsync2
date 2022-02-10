import React, { Component } from 'react';

import './Play.css';
import {ReactComponent as PlayerBack} from './assets/back.svg';
export default class Preview extends Component {
  render() {
    return (
      <div className="preview" >
        <PlayerBack width={100} height={100} />
      </div>
    );
  }
}
