import React from 'react';
import ReactDOM from 'react-dom';
import enUS from 'antd/lib/locale-provider/en_US';
import { ConfigProvider } from 'antd';

import App from './App';
import './index.css';

ReactDOM.render(
  (
    <ConfigProvider locale={enUS}>
      <App />
    </ConfigProvider>
  ),
  document.getElementById('root'),
);
