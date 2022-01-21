import React from "react";
import PropTypes from "prop-types";
import './ChatInput.css'

class ChatInput extends React.Component {
    
    constructor(props) {
        super(props);
    }

    handleKeyDown = (event) => {
        if (event.key == "Enter" && event.target.value != "") {
            // Send message to database and other user
            let url = "/api/rooms/addMessage?roomId=" + this.props.roomId;
            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({text: event.target.value, sentTimestamp: new Date()})
            });

            // Clear the input value
            event.target.value = "";
        }
    };

    render() {
        return (
            <input type="text" className="ChatInput" onKeyDown={this.handleKeyDown}></input>
        );
    }
}

ChatInput.propTypes = {
    roomId: PropTypes.string,
    appendMessageList: PropTypes.func
}

ChatInput.defaultProps = {
    roomId: ""
}

export default ChatInput;