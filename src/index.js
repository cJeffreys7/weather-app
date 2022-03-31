import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.scss';
import App from './app/App';

const container = document.getElementById('app');

const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);