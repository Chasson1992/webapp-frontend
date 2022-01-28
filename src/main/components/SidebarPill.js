import React from "react";
import PropTypes from "prop-types";
import SidebarItem from "./SidebarItem";

import './SidebarPill.css'

class SidebarPill extends React.Component {

    static propTypes = {
        roomSelectionHandler: PropTypes.func,
    }

    constructor(props) {
        super(props);
        this.state = {
            // User Object from JSON
            onlineUsers: [],
            // Room Object from JSON
            rooms: []
        }
    }

    checkForOnlineUsers = () => {
        // Fetch online users from the database
        fetch("/api/users/search/online?online=true")
            .then(reponse => reponse.json())
            .then(data => {
                this.setState({onlineUsers: data});
            })
            .catch(error => {
                console.log(error);
            });
    }

    getRooms = () => {
        // Fetch online users from the database
        fetch("/api/rooms")
            .then(reponse => reponse.json())
            .then(data => {
                this.setState({rooms: Object.values(data)});
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount = () => {
        this.getRooms();
        this.checkForOnlineUsers();

        // Polling every 5 seconds
        this.checkForUserTimer = setInterval(this.checkForOnlineUsers, 5000);
    }

    componentWillUnmount = () => {
        clearInterval(this.checkForUserTimer);
    }

    render() {

        let roomSidebarItems=[];
        this.state.rooms.forEach((room,index) =>(
            roomSidebarItems.push(<SidebarItem
                roomId={room["id"]}
                key={index} 
                name={room["name"]}
                selectionHandler={this.props.roomSelectionHandler}/>)
        ));

        let onlineUserItems=[];
        this.state.onlineUsers.forEach((user,index) =>(
            onlineUserItems.push(<SidebarItem
                roomId={user["id"]}
                key={index} 
                name={user["firstName"] + user["lastName"]}
                selectionHandler={this.props.roomSelectionHandler}/>)
        ));

        return (
            <div className="SidebarPill">
                <div className="SiderbarPillHeaderText">Users</div>
                {onlineUserItems}
                <div className="SiderbarPillDivider"/>
                <div className="SiderbarPillHeaderText">Rooms</div>
                {roomSidebarItems}
            </div>
        );
    }
}

export default SidebarPill;