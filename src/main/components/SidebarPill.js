import React from "react";
import PropTypes from "prop-types";
import SidebarItem from "./SidebarItem";

import './SidebarPill.css'

class SidebarPill extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            onlineUsers: []
        }
    }

    checkForOnlineUsers = () => {
        // Fetch online users from the database
        fetch("/api/users/online")
            .then(reponse => reponse.json())
            .then(data => {
                this.setState({onlineUsers: data});
            });
    }

    componentDidMount = () => {
        this.checkForOnlineUsers();

        // Polling once a second
        setInterval(this.checkForOnlineUsers, 1000);
    }

    render() {

        let onlineUsers=[];
        let displayName = "";
        this.state.onlineUsers.forEach((user,index) =>(

            onlineUsers.push(<SidebarItem 
                key={index} 
                name={user.firstName + " " + user.lastName}/>)
        ));

        return (
            <div className="SidebarPill">
                {onlineUsers}
            </div>
        );
    }
}

export default SidebarPill;