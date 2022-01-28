import React from "react";
import PropTypes from "prop-types";
import './ChatArea.css'
import ChatInput from "./ChatInput";
import stompClient from "../..";
class ChatArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: []
        }

        // Setup subscription
        let url = '/topic/messages/' + this.props.roomId;
        this.subscription = 
            stompClient.subscribe(url, this.handleMessageReceived)

    }

    handleMessageReceived = (message) => {
        let messageBody = JSON.parse(message.body);
        this.state.messages.push({
            text: messageBody.text,
            sentTimestamp: messageBody.sentTimestamp
        });
        this.setState({messages: this.state.messages});
    }

    componentDidMount = () => {
        this.setState({messages: this.props.messages});
    }

    componentWillUnmount = () => {
        this.subscription.unsubscribe();
    }

    render() {
        let messageItems=[];
        if(this.state.messages) {
            let messagesContainer = Object.values(this.state.messages);
            for (var iter = 0; iter < messagesContainer.length; iter++) {
                messageItems.unshift(
                    <div className="ChatMessagesContainer"  key={iter}>
                        <div className="ChatMessagesTimestamp">
                            {messagesContainer[iter].sentTimestamp}
                        </div>
                        <div className="ChatMessagesText">
                            {messagesContainer[iter].text}
                        </div>
                    </div>);
            }
        }

        return (
            <div className="ChatArea">
                <ChatInput roomId={this.props.roomId} key={this.props.roomId}/>
                <div className="ChatAreaDivider"/>
                {messageItems}
            </div>
        );
    }
}

ChatArea.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.object),
    roomId: PropTypes.string,
}

ChatArea.defaultProps = {
    messages: [],
    roomId: ""
}

export default ChatArea;