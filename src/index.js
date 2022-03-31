import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app/App';

const container = document.getElementById('app');

// const root = ReactDOMClient.createRoot(container);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  container
);