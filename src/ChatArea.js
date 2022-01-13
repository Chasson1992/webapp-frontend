import React from "react";
import PropTypes from "prop-types";
import './ChatArea.css'
import ChatInput from "./main/components/ChatInput";

class ChatArea extends React.Component {

    // Type checks
    static propTypes = {
    }

    constructor(props) {
        super(props);

        this.state = {
            messages: Array.of(String)
        };
    }

    checkForOnlineUsers = () => {
        // Fetch online users from the database
        // fetch("/api/users/online")
        //     .then(reponse => reponse.json())
        //     .then(data => {
        //         for (const key of Object.keys(data)) {
        //             this.receiveMessage(data[key].firstName);
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
    }

    componentDidMount = () => {
        // this.checkForOnlineUsers();

        // // Polling once a second
        // setInterval(this.checkForOnlineUsers, 1000);
    }

    receiveMessage = (msg) => {

        let currentMessages = [];
        currentMessages = this.state.messages;
        currentMessages.push(msg);

        this.setState({messages: currentMessages});
    }

    render() {
    
        let messageItems=[];
        Array.from(this.state.messages).forEach( (text, index) => (
            messageItems.push(<div key={index} className="ChatMessages">{text}</div>)
        ));

        return (
            <div className="ChatArea">
                <ChatInput/>
                <div className="ChatAreaDivider"/>
                {messageItems}
            </div>
        );
    }
}

export default ChatArea;