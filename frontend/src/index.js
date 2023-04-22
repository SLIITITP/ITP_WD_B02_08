import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
const script = document.createElement('script');
script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
document.head.appendChild(script);

const dfMessenger = document.createElement('df-messenger');
dfMessenger.setAttribute('intent', 'WELCOME');
dfMessenger.setAttribute('chat-title', 'Thilina institute chat-bot1');
dfMessenger.setAttribute('agent-id', 'f94893e9-e673-4e56-810d-36b100bc91e0');
dfMessenger.setAttribute('language-code', 'en');
document.body.appendChild(dfMessenger);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
