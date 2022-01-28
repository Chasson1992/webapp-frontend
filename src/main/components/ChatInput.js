import React from "react";
import PropTypes from "prop-types";
import './ChatInput.css'
import stompClient from "../..";

class ChatInput extends React.Component {
    
    constructor(props) {
        super(props);

        this.url = '/api/messages?roomId=' + this.props.roomId;
    }

    handleKeyDown = (event) => {
        if (event.key == "Enter" && event.target.value != "") {
            // Send message to database and other user
            stompClient.send(
                // URL
                this.url,
                // Headers 
                {}, 
                // Contents
                JSON.stringify({
                    text: event.target.value, 
                    sentTimestamp: new Date()
                })
            );

            // Clear the input value
            event.target.value = "";
        }
    };

    render() {
        return (
            <input type="text" className="ChatInput" placeholder="Start borking!" onKeyDown={this.handleKeyDown}></input>
        );
    }
}

ChatInput.propTypes = {
    roomId: PropTypes.string,
    appendMessageList: PropTypes.func,
    client: PropTypes.object
}

ChatInput.defaultProps = {
    roomId: ""
}

export default ChatInput;