import React from "react";
import PropTypes from "prop-types";
import './ChatInput.css'

class ChatInput extends React.Component {

    // Type checks
    static propTypes = {
        appendMessageList: PropTypes.func
    }
    
    constructor(props) {
        super(props);
    }

    handleKeyDown = (event) => {
        if (event.key == "Enter" && event.target.value != "") {
            // Send message to database and other user

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

export default ChatInput;