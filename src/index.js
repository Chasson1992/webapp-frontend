import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Application from './main/Application';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

// Setup web socket
const stompClient = Stomp.over(new SockJS('/bork'));
stompClient.connect({}, function () {
    // Render the application once we've connected to the back-end
    ReactDOM.render(
      <React.StrictMode>
        <Application />
      </React.StrictMode>,
      document.getElementById('root')
    )
  }
)

// You can change debug later to a logging framework (default value is console.log())
stompClient.debug = null;

export default stompClient;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
