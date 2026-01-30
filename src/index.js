import React from 'react';
import { createRoot } from 'react-dom/client';
import enUS from 'antd/locale/en_US';
import { ConfigProvider } from 'antd';

import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={enUS}>
    <App />
  </ConfigProvider>
);
