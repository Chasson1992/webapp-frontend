import React from "react";
import PropTypes from "prop-types";
import './ChatArea.css'
import stompClient from "../../../..";
import ChatInput from "./ChatInput";

class ChatArea extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            chatArea: null
        }

        this.chatAreaElementRef = React.createRef();
        this.subscription = null;
    }

    moveScrollbarDown() {
        this.chatAreaElementRef.current.scrollTop =  
            this.chatAreaElementRef.current.scrollHeight -
            this.chatAreaElementRef.current.clientHeight;
    }

    handleMessageReceived = (message) => {
        let messageBody = JSON.parse(message.body);

        this.state.messages.push({
            text: messageBody.text,
            sentTimestamp: messageBody.sentTimestamp
        });
        
        this.setState({messages: this.state.messages});
    }

    getSnapshotBeforeUpdate = () => {
        // There's probably a much better way to do this.
        // I'm trying to keep the scroll bar at the bottom of the viewport if we're currently at the bottom
        // and not move if the user has scrolled up.

        // Calculate if the scrollbar is at the bottom
        let currentChatArea = this.chatAreaElementRef.current;
        const isScrolledToBottom = currentChatArea.scrollHeight - currentChatArea.clientHeight <=
            currentChatArea.scrollTop + 1; // padding
        
        return isScrolledToBottom;
    }

    componentDidUpdate = (isScrolledToBottom) => {
        // If we were scrolled to the bottom before receiving this update, move scrollbar down to keep
        // at the bottom.
        if (isScrolledToBottom) {
            this.moveScrollbarDown();
        }
    }

    componentDidMount = () => {
        // Setup subscription
        let url = '/topic/messages/' + this.props.roomId;
        this.subscription = 
            stompClient.subscribe(url, this.handleMessageReceived);
        
        this.setState({chatArea: document.getElementById('chatAreaMessageElement')})
        this.setState({messages: this.props.messages});
    }

    componentWillUnmount = () => {
        this.subscription.unsubscribe();
    }

    render() {
        let messageItems = [];
        this.state.messages.forEach( (message, index) => {
            messageItems.push(
                <div className="ChatMessagesContainer"  key={index}>
                    <div className="ChatMessagesTimestamp">
                        {message.sentTimestamp}
                    </div>
                    <div className="ChatMessagesText">
                        {message.text}
                    </div>
                </div>
            )
        });

        // Messages/Divider/Input
        return (
            <div className="ChatArea">
                <div ref={this.chatAreaElementRef} className="ChatMessageArea">
                    {Object.values({messageItems})}
                </div>
                <div className="ChatInputArea">
                    <div className="ChatAreaDivider"/> 
                    <ChatInput roomId={this.props.roomId}/>
                </div>
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