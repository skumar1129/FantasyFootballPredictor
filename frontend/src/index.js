import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
  );
  
export default db;
