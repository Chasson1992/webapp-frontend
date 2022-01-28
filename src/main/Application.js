import React from 'react';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import './Application.css';
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
    // Fetch messages from the database with a limit
    let url = "/api/rooms/search/roomId?roomId=" + roomId;
    fetch(url)
        .then(reponse => reponse.json())
        .then(this.handleRoomResponse)
        .catch(error => {
            console.log(error);
        });
  }

  handleRoomResponse = (data) => {
    this.setState({
      messages: data.messages,
      activeRoomId: data.id
    });

    console.log(this.state)
  }

  render() {
      return (
      <div className="Application">
        <Sidebar roomSelectionHandler={this.handleRoomSelection} />
        <ChatArea 
          messages={this.state.messages} 
          roomId={this.state.activeRoomId} 
          key={this.state.activeRoomId}
        />
      </div>
    );
  }
}

export default Application;
