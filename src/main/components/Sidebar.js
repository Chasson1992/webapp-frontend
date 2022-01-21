import React from "react";
import PropTypes from "prop-types";
import './Sidebar.css'
import SidebarPill from "./SidebarPill";

class Sidebar extends React.Component {

    static propTypes = {
        roomSelectionHandler: PropTypes.func
    }

    render() {
        return (
            <div className="Sidebar">
                <h1 className="SidebarHeaderText">
                    Bork!
                </h1>
                <div className="SiderbarDivider"/>
                <SidebarPill roomSelectionHandler={this.props.roomSelectionHandler}/>
            </div >
        );
    }
}

export default Sidebar;