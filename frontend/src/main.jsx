import React from 'react';
import ReactDOM from 'react-dom/client';
// Load Bootstrap first, so the app's own styles override it
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
