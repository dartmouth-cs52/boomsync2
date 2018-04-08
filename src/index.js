import React from 'react';
import ReactDOM from 'react-dom';
import enUS from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';

import App from './App';
import './index.css';

ReactDOM.render(
  (
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  ),
  document.getElementById('root'),
);
