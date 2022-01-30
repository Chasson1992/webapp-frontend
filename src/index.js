import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import logo from './logo.png'
import Builder from './main/Builder';

// Setup web socket
const stompClient = Stomp.over(new SockJS('/bork'));
// You can change debug later to a logging framework (default value is console.log())
stompClient.debug = null;
export default stompClient;

// Kick off builder that will construct and launch the app
let builder = new Builder();
builder.initializeBork();

// Render the spinning logo while we wait for initialization
ReactDOM.render(
  <div className="LoadingScreen">
    <img src={logo} className="LoadingScreen-Logo"></img>
  </div>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
