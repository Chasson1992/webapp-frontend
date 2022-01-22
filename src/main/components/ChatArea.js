import React from "react";
import PropTypes from "prop-types";
import './ChatArea.css'
import ChatInput from "./ChatInput";
import * as SockJS from 'sockjs-client';

class ChatArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }

        this.setState({messages: this.props.messages});
    }

    checkForMessages = () => {
        let url = "/api/rooms/search/roomId?roomId=" + this.props.roomId;
        fetch(url)
            .then(reponse => reponse.json())
            .then(data => {
                if (data) {
                    this.setState({
                    messages: data["messages"],
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
        this.checkForMessages();

        const socket = new SockJS("http://localhost:8080/chatroom", {}, {CheckOrigin: () => false});
        socket.onopen = () => {
            console.log('Connected');
        }

        // Polling every half second
        this.messageTimer = setInterval(this.checkForMessages, 500);
    }

    componentWillUnmount = () => {
        clearInterval(this.messageTimer);
    }

    render() {

        // Since we're making so make calls to check messages, this function
        // is being called every .5 seconds (or whatever that interval is set to)
        // Its not being rendered to the DOM most of the time since React checks
        // if the component is different but its still going to eventually be burdensome
        // Network tab is BUSY

        let messageItems=[];
        if(this.state.messages) {
            let messagesContainer = Object.values(this.state.messages);
            for (var iter = 0; iter < messagesContainer.length; iter++) {
                let timestamp = Date(messagesContainer[iter]["sentTimestamp"]);
                messageItems.unshift(
                    <div className="ChatMessagesContainer">
                        <div className="ChatMessagesTimestamp">
                            {messagesContainer[iter]["sentTimestamp"]}
                        </div>
                        <div className="ChatMessagesText">
                            {messagesContainer[iter]["text"]}
                        </div>
                    </div>);
            }
        }

        return (
            <div className="ChatArea">
                <ChatInput roomId={this.props.roomId}/>
                <div className="ChatAreaDivider"/>
                {messageItems}
            </div>
        );
    }
}

ChatArea.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    roomId: PropTypes.string
}

ChatArea.defaultProps = {
    messages: ["Start typing"],
    roomId: ""
}

export default ChatArea;