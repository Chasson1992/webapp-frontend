import Sidebar from './components/Sidebar';
import ChatArea from '.././ChatArea';
import React from 'react';

class Application extends React.Component {
  render() {
      return (
      <div >
        <Sidebar/>
        <ChatArea/>
      </div>
    );
  }
}

export default Application;
