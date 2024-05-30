import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// STEP-2
// Once the store is created, we can make it available to our React components by putting a React-Redux <Provider> around our application in src/index.js. and pass the store as a prop:

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Wrapping our app component due to provider we inject store in react app.

    <App />

);

reportWebVitals();
