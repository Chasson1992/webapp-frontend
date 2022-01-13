import React from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from '.././ChatArea';
import './Application.css'

class Application extends React.Component {
  render() {
      return (
      <div className="Application">
        <Sidebar/>
        <ChatArea/>
      </div>
    );
  }
}

export default Application;
