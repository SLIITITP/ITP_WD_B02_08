import  { useEffect } from 'react';

const Bot = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    document.head.appendChild(script);

    const dfMessenger = document.createElement('df-messenger');
    dfMessenger.setAttribute('intent', 'WELCOME');
    dfMessenger.setAttribute('chat-title', 'Thilina Institute Chatbot');
    dfMessenger.setAttribute('agent-id', 'f94893e9-e673-4e56-810d-36b100bc91e0');
    dfMessenger.setAttribute('language-code', 'en');
    document.body.appendChild(dfMessenger);

    return () => {
    
      document.head.removeChild(script);
      document.body.removeChild(dfMessenger);
    };
  }, []);

  return null; 
};

export default Bot;


/*import React, { Component } from 'react';

export default class Bot extends Component {
    
  componentDidMount() {
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    document.head.appendChild(script);

    const dfMessenger = document.createElement('df-messenger');
    dfMessenger.setAttribute('intent', 'WELCOME');
    dfMessenger.setAttribute('chat-title', 'Thilina institute chat-bot1');
    dfMessenger.setAttribute('agent-id', 'f94893e9-e673-4e56-810d-36b100bc91e0');
    dfMessenger.setAttribute('language-code', 'en');
    document.body.appendChild(dfMessenger);
  }

  render() {
    return (
      <div>
        
      </div>
    );
  }
}*/