import React from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import './Application.css'

class Application extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        activeRoomId: "",
        messages: []
    }
}

  handleRoomSelection = (roomId) => {
    // Update chat area to show new room
    // Fetch messages from the database
    let url = "/api/rooms/search/roomId?roomId=" + roomId;
    fetch(url)
        .then(reponse => reponse.json())
        .then(data => {
            this.setState({
              messages: data["messages"],
              activeRoomId: roomId
            });
            console.log("New room selected : " + this.state.activeRoomId);
            console.log("With messages : " + this.state.messages)
        })
        .catch(error => {
            console.log(error);
        });
  }

  render() {
      return (
      <div className="Application">
        <Sidebar roomSelectionHandler={this.handleRoomSelection}/>
        <ChatArea messages={this.state.messages} roomId={this.state.activeRoomId}/>
      </div>
    );
  }
}

export default Application;
