import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import All_context from './context/All_context';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <All_context>
      <React.StrictMode>
        <App />
        <ToastContainer />
      </React.StrictMode>
    </All_context>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
